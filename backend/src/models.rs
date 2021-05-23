use crate::schema::{members};

#[derive(Queryable)]
pub struct Member {
  pub id: i32,
  pub name: String,
}

#[derive(Insertable)]
#[table_name="members"]
pub struct NewMember<'a>{
  pub name: &'a String
}

#[derive(Queryable)]
pub struct Role {
  pub id: i32,
  pub name: String,
  pub emoji: Option<String>
}
