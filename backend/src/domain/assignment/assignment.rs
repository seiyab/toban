use chrono::NaiveDate;

use crate::domain::member::MemberID;
use crate::domain::role::RoleID;

#[derive(Queryable)]
pub struct Assignment {
  pub id: AssignmentID,
  pub role_id: RoleID,
  pub start_at: NaiveDate,
  pub end_at: NaiveDate,
  pub member_id: MemberID,
}

pub type AssignmentID = i64;
