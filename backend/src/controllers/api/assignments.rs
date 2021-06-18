use rocket::get;
use rocket::request::Form;
use rocket_contrib::json::Json;

use openapi_client::models as spec;

use crate::db_connection;
use crate::controllers::transfer::time::{NaiveDateForm, date_to_resp};
use crate::domain::assignment;


#[derive(FromForm)]
pub struct GetAssignmentsQuery {
  pub from: NaiveDateForm,
  pub to: NaiveDateForm,
}

#[derive(Responder)]
pub enum GetAssignmentsResponse {
  #[response(status = 200, content_type = "json")]
  R200(Json<Vec<spec::Assignment>>),
  #[response(status = 500, content_type = "json")]
  R500(Json<spec::Error>),
}

#[get("/assignments?<query..>")]
pub fn get_assignments(conn: db_connection::AppDbConn, query: Form<GetAssignmentsQuery>) -> GetAssignmentsResponse {
  let repo = assignment::AssignmentRepository::new(&conn);
  match repo.find_by_interval(&query.from, &query.to) {
    Ok(assignments) => GetAssignmentsResponse::R200(Json(
      assignments.iter().map(|a| a.to_resp()).collect::<Vec<spec::Assignment>>()
    )),
    Err(_) => GetAssignmentsResponse::R500(Json(
      spec::Error{code: None, message: None}
    ))
  }
}

impl assignment::Assignment {
  fn to_resp(&self) -> spec::Assignment {
    spec::Assignment{
      id: self.id,
      role_id: self.id,
      start_at: date_to_resp(&self.start_at),
      end_at: date_to_resp(&self.end_at),
      member_id: self.member_id,
    }
  }
}
