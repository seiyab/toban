use rocket::get;
use rocket_contrib::json::Json;
use diesel;
use diesel::prelude::*;

use openapi_client::models as spec;

use crate::domain::role;
use crate::db_connection;

#[derive(Responder)]
pub enum GetRoleResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<spec::Role>),
  #[response(status = 404, content_type = "json")]
  R404(Json<spec::Error>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[get("/roles/<role_id>")]
pub fn get_role(conn: db_connection::AppDbConn, role_id: i64) -> GetRoleResponse {
  let repo = role::RoleRepository::new(&conn);
  match repo.find(role_id) {
    Ok(Some(r)) => GetRoleResponse::R200(Json(r.to_resp())),
    Ok(None) => GetRoleResponse::R404(Json(spec::Error{
      code: None,
      message: Some("not found".to_string()),
    })),
    Err(_) => GetRoleResponse::R500(Json(spec::Error{
      code: None,
      message: Some("internal server error".to_string()),
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
  let repo = role::RoleRepository::new(&conn);
  match repo.find_all() {
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
  let repo = role::RoleRepository::new(&conn);
  conn.transaction(|| {
    let id = repo.new_id().or(Err(diesel::result::Error::RollbackTransaction))?;
    let new_role = role::Role{
      id: id,
      name: body.name.clone(),
      emoji: body.emoji.clone(),
    };
    repo.save(&new_role)
      .and(Ok(id))
      .or(Err(diesel::result::Error::RollbackTransaction))
  })
    .map(|id: i64| PostRolesResponse::R201(Json(spec::New{id})))
    .unwrap_or(PostRolesResponse::R500(Json(spec::Error{
        code: None,
        message: Some("failed to create a role".to_string()),
    })))
}

impl role::Role {
  fn to_resp(&self) -> spec::Role {
    spec::Role{
      id: self.id,
      name: self.name.clone(),
      emoji: self.emoji.clone(),
    }
  }
}

