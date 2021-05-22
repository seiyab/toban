#[derive(Queryable)]
pub struct Member {
  pub id: i32,
  pub name: String,
}

#[derive(Queryable)]
pub struct Role {
  pub id: i32,
  pub name: String,
  pub emoji: Option<String>
}
