table! {
    members (id) {
        id -> Integer,
        name -> Varchar,
    }
}

table! {
    roles (id) {
        id -> Integer,
        name -> Varchar,
        emoji -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(
    members,
    roles,
);
