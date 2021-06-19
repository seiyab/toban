use diesel;
use diesel::prelude::*;

use crate::db_connection;

use crate::schema::members::*;

use super::member::{Member, MemberID};

pub struct MemberRepository<'a> {
  conn: &'a db_connection::AppDbConn,
}

impl<'a> MemberRepository<'a> {
  pub fn new(conn: &'a db_connection::AppDbConn) -> Self {
    Self {conn}
  }

  pub fn find(&self, member_id: MemberID) -> Result<Option<Member>, ()> {
    dsl::members
      .filter(columns::id.eq(member_id))
      .first(&**self.conn)
      .optional()
      .or(Err(()))
  }

  pub fn find_all(&self) -> Result<Vec<Member>, ()> {
    dsl::members.load::<Member>(&**self.conn)
      .or(Err(()))
  }

  pub fn new_id(&self) -> Result<MemberID, ()> {
    diesel::select(db_connection::nextval("member_seq"))
      .first::<MemberID>(&**self.conn)
      .or(Err(()))
  }

  pub fn save(&self, member: &Member) -> Result<(), ()> {
    diesel::insert_into(dsl::members)
      .values(member)
      .execute(&**self.conn)
      .and(Ok(()))
      .or(Err(()))
  }
}
