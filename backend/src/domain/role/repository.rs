use diesel;
use diesel::prelude::*;

use crate::db_connection;
use crate::schema::roles::*;

use super::role::{Role, RoleID};

pub struct RoleRepository<'a> {
  conn: &'a db_connection::AppDbConn,
}

impl<'a> RoleRepository<'a> {
  pub fn new(conn: &'a db_connection::AppDbConn) -> Self {
    Self {conn}
  }

  pub fn find(&self, role_id: RoleID) -> Result<Option<Role>, ()> {
    dsl::roles
      .filter(columns::id.eq(role_id))
      .first(&**self.conn)
      .optional()
      .or(Err(()))
  }

  pub fn find_all(&self) -> Result<Vec<Role>, ()> {
    dsl::roles.load::<Role>(&**self.conn)
      .or(Err(()))
  }

  pub fn new_id(&self) -> Result<RoleID, ()> {
    diesel::select(db_connection::nextval("role_seq"))
      .first::<RoleID>(&**self.conn)
      .or(Err(()))
  }

  pub fn save(&self, role: &Role) -> Result<(), ()> {
    diesel::insert_into(dsl::roles)
      .values(role)
      .execute(&**self.conn)
      .and(Ok(()))
      .or(Err(()))
  }
}
