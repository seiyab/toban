use rocket_contrib::databases::diesel::{PgConnection};
use diesel::prelude::*;
use diesel::sql_types;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

#[database("app")]
pub struct AppDbConn(PgConnection);

sql_function!(fn nextval(seq: sql_types::Text) -> sql_types::Int8);
