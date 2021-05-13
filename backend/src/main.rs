use toban_backend::controllers;
use toban_backend::db_connection;

fn main() {
  rocket::ignite()
  .attach(db_connection::AppDbConn::fairing())
  .mount("/", controllers::static_content::routes())
  .mount("/api", controllers::api::routes()).launch();
}
