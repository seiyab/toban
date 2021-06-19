use crate::schema::roles;

#[derive(Queryable, Insertable)]
pub struct Role {
  pub id: RoleID,
  pub name: String,
  pub emoji: Option<String>
}

pub type RoleID = i64;
