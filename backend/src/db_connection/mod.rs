use rocket_contrib::databases::diesel::{MysqlConnection};
use diesel::prelude::*;
use diesel::sql_types;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    MysqlConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

#[database("app")]
pub struct AppDbConn(MysqlConnection);

no_arg_sql_function!(last_insert_id, sql_types::Integer);
