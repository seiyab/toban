
use rocket::get;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use openapi_client::models as spec;

use crate::schema::roles::dsl::*;
use crate::db_connection;
use crate::models;

#[derive(Responder)]
pub enum GetRoleResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<spec::Role>),
  #[response(status = 404, content_type = "json")]
  R404(Json<spec::Error>),
}

#[get("/roles/<role_id>")]
pub fn get_role(conn: db_connection::AppDbConn, role_id: i32) -> GetRoleResponse {
  let role = roles
    .filter(id.eq(role_id))
    .first::<models::Role>(&*conn);

  match role {
    Ok(r) => GetRoleResponse::R200(Json(r.to_resp())),
    Err(_) => GetRoleResponse::R404(Json(spec::Error{
      code: None,
      message: Some("not found".to_string()),
    })),
  }
}

#[derive(Responder)]
pub enum GetRolesResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<Vec<spec::Role>>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[get("/roles")]
pub fn get_roles(conn: db_connection::AppDbConn) -> GetRolesResponse {
  match roles.load::<models::Role>(&*conn) {
    Ok(rows) => GetRolesResponse::R200(Json(
      rows.iter().map(|r| r.to_resp()).collect()
    )),
    Err(_) => GetRolesResponse::R500(Json(spec::Error{
      code: None,
      message: Some("internal server error".to_string()),
    })),
  }
}

#[derive(Responder)]
pub enum PostRolesResponse {
  #[response(status = 201, content_type = "json")]
  R201(Json<spec::New>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[post("/roles", data="<body>")]
pub fn post_roles(conn: db_connection::AppDbConn, body: Json<spec::NewRole>) -> PostRolesResponse {
  let new_role = models::NewRole{
    name: body.name.clone(),
    emoji: body.emoji.clone(),
  };

  conn.transaction(|| {
    diesel::insert_into(roles)
      .values(new_role)
      .execute(&*conn)
      .and_then(|_| {
        diesel::select(db_connection::last_insert_id)
          .first::<i32>(&*conn)
      })
  })
    .map(|last_id: i32| PostRolesResponse::R201(Json(spec::New{id: last_id})))
    .unwrap_or(PostRolesResponse::R500(Json(spec::Error{
        code: None,
        message: Some("failed to create a role".to_string()),
    })))
}

impl models::Role {
  fn to_resp(&self) -> spec::Role {
    spec::Role{
      id: self.id,
      name: self.name.clone(),
      emoji: self.emoji.clone(),
    }
  }
}

