use std::ops::Deref;
use rocket::request::FromFormValue;
use rocket::http::RawStr;
use chrono::{NaiveDate, DateTime, Utc};

pub struct NaiveDateForm(NaiveDate);

impl<'v> FromFormValue<'v> for NaiveDateForm {
  type Error = &'v RawStr;

  fn from_form_value(form_value: &'v RawStr) -> Result<Self, Self::Error> {
    form_value.url_decode()
      .ok()
      .and_then(|s| NaiveDate::parse_from_str(s.as_str(), "%Y-%m-%d").ok())
      .map(NaiveDateForm)
      .ok_or(form_value)
  }

  fn default() -> Option<Self> { None }
}

impl Deref for NaiveDateForm {
  type Target = NaiveDate;
  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

pub fn date_to_resp(date: &NaiveDate) -> DateTime<Utc> {
  DateTime::from_utc(date.and_hms(0, 0, 0), Utc)
}
