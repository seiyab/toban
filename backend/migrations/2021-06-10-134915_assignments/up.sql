-- Your SQL goes here
CREATE TABLE assignments (
  id BIGINT PRIMARY KEY NOT NULL,
  role_id BIGINT NOT NULL,
  start_at DATE NOT NULL,
  end_at DATE NOT NULL,
  member_id BIGINT NOT NULL
);

CREATE SEQUENCE assignment_seq as BIGINT;
