#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;
extern crate toban_backend;

mod models;
mod db_connection;

use rocket::response::status::NotFound;
use rocket_contrib::json::Json;
use toban_backend::schema::users::dsl::*;
use self::diesel::prelude::*;

#[get("/users/<user_id>")]
fn index(conn: db_connection::AppDbConn, user_id: i32) -> Result<Json<models::User>, NotFound<String>> {
  users
    .filter(id.eq(user_id))
    .first::<models::User>(&*conn)
    .map(Json)
    .map_err(|_| NotFound("not found".to_string()))
}

fn main() {
  rocket::ignite()
  .attach(db_connection::AppDbConn::fairing())
  .mount("/", routes![index]).launch();
}
