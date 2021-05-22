
use rocket::get;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use openapi_client::models as response;

use crate::schema::roles::dsl::*;
use crate::db_connection;
use crate::models;

#[derive(Responder)]
pub enum GetRoleResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<response::Role>),
  #[response(status = 404, content_type = "json")]
  R404(Json<response::Error>),
}

#[get("/roles/<role_id>")]
pub fn get_role(conn: db_connection::AppDbConn, role_id: i32) -> GetRoleResponse {
  let role = roles
    .filter(id.eq(role_id))
    .first::<models::Role>(&*conn);

  match role {
    Ok(r) => GetRoleResponse::R200(Json(r.to_resp())),
    Err(_) => GetRoleResponse::R404(Json(response::Error{
      code: None,
      message: Some("not found".to_string()),
    })),
  }
}

#[derive(Responder)]
pub enum GetRolesResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<Vec<response::Role>>),
  #[response(status = 500, content_type = "json")]
  R500(Json<response::Error>),
}

#[get("/roles")]
pub fn get_roles(conn: db_connection::AppDbConn) -> GetRolesResponse {
  match roles.load::<models::Role>(&*conn) {
    Ok(rows) => GetRolesResponse::R200(Json(
      rows.iter().map(|r| r.to_resp()).collect()
    )),
    Err(_) => GetRolesResponse::R500(Json(response::Error{
      code: None,
      message: Some("internal server error".to_string()),
    })),
  }
}

impl models::Role {
  fn to_resp(&self) -> response::Role {
    response::Role{
      id: self.id,
      name: self.name.clone(),
      emoji: self.emoji.clone(),
    }
  }
}
