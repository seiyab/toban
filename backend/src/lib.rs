#![feature(proc_macro_hygiene, decl_macro, allocator_api)]
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;
// #[macro_use]
// extern crate diesel;

pub mod schema;
pub mod models;
pub mod db_connection;
pub mod controllers;

