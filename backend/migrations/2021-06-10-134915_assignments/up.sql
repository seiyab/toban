-- Your SQL goes here
CREATE TABLE assignments (
  id INT NOT NULL PRIMARY KEY,
  role_id INT NOT NULL,
  start_at DATE NOT NULL,
  end_at DATE NOT NULL,
  member_id INT NOT NULL
);
