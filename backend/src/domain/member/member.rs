use crate::schema::members;

#[derive(Queryable, Insertable)]
pub struct Member {
  pub id: MemberID,
  pub name: String,
}

pub type MemberID = i64;
