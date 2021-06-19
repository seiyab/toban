use rocket::{get, post};
use rocket_contrib::json::Json;
use diesel;
use diesel::prelude::*;

use openapi_client::models as spec;

use crate::domain::member;
use crate::db_connection;


#[derive(Responder)]
pub enum GetMemberResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<spec::Member>),
  #[response(status = 404, content_type = "json")]
  R404(Json<spec::Error>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[get("/members/<member_id>")]
pub fn get_member(conn: db_connection::AppDbConn, member_id: i64) -> GetMemberResponse {
  let repo = member::MemberRepository::new(&conn);
  match repo.find(member_id) {
    Ok(Some(m)) => GetMemberResponse::R200(Json(m.to_resp())),
    Ok(None) => GetMemberResponse::R404(Json(spec::Error{
      code: None,
      message: Some("not found".to_string()),
    })),
    Err(_) => GetMemberResponse::R500(Json(spec::Error{
      code: None,
      message: Some("internal server error".to_string()),
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
  let repo = member::MemberRepository::new(&conn);
  match repo.find_all() {
    Ok(members) => GetMembersResponse::R200(Json(members.iter().map(|row| row.to_resp()).collect())),
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
  let repo = member::MemberRepository::new(&conn);
  conn.transaction(|| {
    let id = repo.new_id().or(Err(diesel::result::Error::RollbackTransaction))?;
    let new_member = member::Member {
      id: id,
      name: body.name.clone(),
    };
    repo.save(&new_member)
      .and(Ok(id))
      .or(Err(diesel::result::Error::RollbackTransaction))
  })
    .map(|id: i64| PostMembersResponse::R201(Json(spec::New{id})))
    .unwrap_or(PostMembersResponse::R500(Json(spec::Error{
        code: None,
        message: Some("failed to create a member".to_string()),
    })))
}

impl member::Member {
  fn to_resp(&self) -> spec::Member {
    spec::Member{
      id: self.id,
      name: self.name.clone()
    }
  }
}
