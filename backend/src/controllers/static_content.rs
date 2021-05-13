use std::path::{PathBuf, Path};
use std::alloc::Global;

use rocket::get;
use rocket::Route;
use rocket::response::{NamedFile};

pub fn routes() -> Vec<Route, Global>{
  routes![pages, page]
}

#[get("/<_file..>", rank = 100)]
fn pages(_file: PathBuf) -> Option<NamedFile> {
  index()
}

#[get("/")]
fn page() -> Option<NamedFile> {
  index()
}

fn index() -> Option<NamedFile> {
  NamedFile::open(
    Path::new(concat!(
      env!("CARGO_MANIFEST_DIR"),
      "/../frontend/out/index.html",
    ))
  ).ok()
}
