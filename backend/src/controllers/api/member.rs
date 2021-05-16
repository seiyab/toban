
use rocket::response::{status::NotFound};
use rocket::get;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use openapi_client::models as response;

use crate::schema::members::dsl::*;
use crate::db_connection;
use crate::models;


#[get("/members/<member_id>")]
pub fn member(conn: db_connection::AppDbConn, member_id: i32) -> Result<Json<response::Member>, NotFound<String>> {
  members
    .filter(id.eq(member_id))
    .first::<models::Member>(&*conn)
    .map(|db| response::Member{id: db.id, name: db.name.clone()})
    .map(Json)
    .map_err(|_| NotFound("not found".to_string()))
}
