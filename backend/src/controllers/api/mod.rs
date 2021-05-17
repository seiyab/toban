use std::alloc::Global;

use rocket::Route;

mod member;

pub fn routes() -> Vec<Route, Global>{
  routes![member::get_member, member::get_members]
}
