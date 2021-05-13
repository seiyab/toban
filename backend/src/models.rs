use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct Member {
  pub id: i32,
  pub name: String,
}
