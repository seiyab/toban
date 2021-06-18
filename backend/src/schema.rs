table! {
    assignments (id) {
        id -> Integer,
        role_id -> Integer,
        start_at -> Date,
        end_at -> Date,
        member_id -> Integer,
    }
}

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
    assignments,
    members,
    roles,
);
