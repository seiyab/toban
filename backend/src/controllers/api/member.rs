
use rocket::response::{status::NotFound};
use rocket::get;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use openapi_client::models as response;

use crate::schema::members::dsl::*;
use crate::db_connection;
use crate::models;


#[get("/members/<member_id>")]
pub fn get_member(conn: db_connection::AppDbConn, member_id: i32) -> Result<Json<response::Member>, NotFound<String>> {
  members
    .filter(id.eq(member_id))
    .first::<models::Member>(&*conn)
    .map(|db| response::Member{id: db.id, name: db.name.clone()})
    .map(Json)
    .map_err(|_| NotFound("not found".to_string()))
}

#[get("/members")]
pub fn get_members(conn: db_connection::AppDbConn) -> Result<Json<Vec<response::Member>>, NotFound<String>> {
  members
    .load::<models::Member>(&*conn)
    .map(|rows| rows.iter().map(|row| row.to_resp()).collect())
    .map(Json)
    .map_err(|_| NotFound("not found".to_string()))
}

impl models::Member {
  fn to_resp(&self) -> response::Member {
    response::Member{
      id: self.id,
      name: self.name.clone()
    }
  }
}
