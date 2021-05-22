use rocket::get;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use openapi_client::models as response;

use crate::schema::members::dsl::*;
use crate::db_connection;
use crate::models;


#[derive(Responder)]
pub enum GetMemberResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<response::Member>),
  #[response(status = 404, content_type = "json")]
  R404(Json<response::Error>),
}

#[get("/members/<member_id>")]
pub fn get_member(conn: db_connection::AppDbConn, member_id: i32) -> GetMemberResponse {
  let member = members
    .filter(id.eq(member_id))
    .first::<models::Member>(&*conn);

  match member {
    Ok(m) => GetMemberResponse::R200(Json(m.to_resp())),
    Err(_) => GetMemberResponse::R404(Json(response::Error{
      code: None,
      message: Some("not found".to_string()),
    })),
  }
}

#[derive(Responder)]
pub enum GetMembersResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<Vec<response::Member>>),
  #[response(status = 500, content_type = "json")]
  R500(Json<response::Error>),
}

#[get("/members")]
pub fn get_members(conn: db_connection::AppDbConn) -> GetMembersResponse {
  match members.load::<models::Member>(&*conn) {
    Ok(rows) => GetMembersResponse::R200(Json(rows.iter().map(|row| row.to_resp()).collect())),
    Err(_) => GetMembersResponse::R500(Json(response::Error{
      code: None,
      message: Some("internal server error".to_string())
    })),
  }
}

impl models::Member {
  fn to_resp(&self) -> response::Member {
    response::Member{
      id: self.id,
      name: self.name.clone()
    }
  }
}
