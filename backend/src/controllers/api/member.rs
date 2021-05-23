use rocket::{get, post};
use rocket_contrib::json::Json;
use diesel;
use diesel::prelude::*;

use openapi_client::models as spec;

use crate::schema::members::dsl::*;
use crate::schema::members::columns::id;
use crate::db_connection;
use crate::models;


#[derive(Responder)]
pub enum GetMemberResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<spec::Member>),
  #[response(status = 404, content_type = "json")]
  R404(Json<spec::Error>),
}

#[get("/members/<member_id>")]
pub fn get_member(conn: db_connection::AppDbConn, member_id: i32) -> GetMemberResponse {
  let member = members
    .filter(id.eq(member_id))
    .first::<models::Member>(&*conn);

  match member {
    Ok(m) => GetMemberResponse::R200(Json(m.to_resp())),
    Err(_) => GetMemberResponse::R404(Json(spec::Error{
      code: None,
      message: Some("not found".to_string()),
    })),
  }
}

#[derive(Responder)]
pub enum GetMembersResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<Vec<spec::Member>>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[get("/members")]
pub fn get_members(conn: db_connection::AppDbConn) -> GetMembersResponse {
  match members.load::<models::Member>(&*conn) {
    Ok(rows) => GetMembersResponse::R200(Json(rows.iter().map(|row| row.to_resp()).collect())),
    Err(_) => GetMembersResponse::R500(Json(spec::Error{
      code: None,
      message: Some("internal server error".to_string())
    })),
  }
}

#[derive(Responder)]
pub enum PostMembersResponse {
  #[response(status = 201, content_type = "json")]
  R201(Json<spec::New>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[post("/members", data="<body>")]
pub fn post_members(conn: db_connection::AppDbConn, body: Json<spec::NewMember>) -> PostMembersResponse {
  let new_member = models::NewMember {
    name: &body.name
  };
  conn.transaction(|| {
    diesel::insert_into(members)
      .values(new_member)
      .execute(&*conn)
      .and_then(|_| {
        diesel::select(db_connection::last_insert_id)
          .first::<i32>(&*conn)
      })
  })
    .map(|last_id: i32| PostMembersResponse::R201(Json(spec::New{id: last_id})))
    .unwrap_or(PostMembersResponse::R500(Json(spec::Error{
        code: None,
        message: Some("failed to create a member".to_string()),
    })))
}

impl models::Member {
  fn to_resp(&self) -> spec::Member {
    spec::Member{
      id: self.id,
      name: self.name.clone()
    }
  }
}
