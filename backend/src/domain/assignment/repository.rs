use chrono::NaiveDate;
use diesel;
use diesel::prelude::*;

use crate::db_connection;
use crate::schema::assignments::dsl::*;
use crate::schema::assignments::columns;
use super::assignment::Assignment;

pub struct AssignmentRepository<'a> {
  conn: &'a db_connection::AppDbConn,
}

impl <'a> AssignmentRepository<'a> {
  pub fn new(conn: &'a db_connection::AppDbConn) -> Self {
    AssignmentRepository {
      conn: conn,
    }
  }

  pub fn find_by_interval(&self, from: &NaiveDate, to: &NaiveDate) -> Result<Vec<Assignment>, ()> {
    assignments
      .filter(columns::start_at.gt(from))
      .filter(columns::end_at.lt(to))
      .load::<Assignment>(&**self.conn)
      .or(Err(()))
  }
}
