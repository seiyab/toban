use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct User {
  pub id: i32,
  pub name: String,
}
