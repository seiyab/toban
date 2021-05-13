
use rocket::response::{status::NotFound};
use rocket::get;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use crate::schema::members::dsl::*;
use crate::db_connection;
use crate::models;


#[get("/members/<member_id>")]
pub fn member(conn: db_connection::AppDbConn, member_id: i32) -> Result<Json<models::Member>, NotFound<String>> {
  members
    .filter(id.eq(member_id))
    .first::<models::Member>(&*conn)
    .map(Json)
    .map_err(|_| NotFound("not found".to_string()))
}