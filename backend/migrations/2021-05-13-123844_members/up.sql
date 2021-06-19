-- Your SQL goes here
CREATE TABLE members (
  id BIGINT PRIMARY KEY NOT NULL ,
  name VARCHAR(50) NOT NULL
);

CREATE SEQUENCE member_seq as BIGINT
