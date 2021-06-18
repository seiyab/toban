use chrono::NaiveDate;

#[derive(Queryable)]
pub struct Assignment {
  pub id: i32,
  pub role_id: i32,
  pub start_at: NaiveDate,
  pub end_at: NaiveDate,
  pub member_id: i32,
}
