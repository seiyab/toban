-- Your SQL goes here
CREATE TABLE roles (
  id BIGINT PRIMARY KEY NOT NULL,
  name VARCHAR(200) NOT NULL,
  emoji VARCHAR(50)
);

CREATE SEQUENCE role_seq as BIGINT;
