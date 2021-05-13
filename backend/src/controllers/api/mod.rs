use std::alloc::Global;

use rocket::Route;

mod member;

pub fn routes() -> Vec<Route, Global>{
  routes![member::member]
}
