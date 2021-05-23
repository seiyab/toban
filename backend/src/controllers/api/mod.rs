use std::alloc::Global;

use rocket::Route;

mod member;
mod role;

pub fn routes() -> Vec<Route, Global>{
  routes![
    member::get_member,
    member::get_members,
    member::post_members,
    role::get_role,
    role::get_roles,
  ]
}
