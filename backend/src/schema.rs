table! {
    assignments (id) {
        id -> Int8,
        role_id -> Int8,
        start_at -> Date,
        end_at -> Date,
        member_id -> Int8,
    }
}

table! {
    members (id) {
        id -> Int8,
        name -> Varchar,
    }
}

table! {
    roles (id) {
        id -> Int8,
        name -> Varchar,
        emoji -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(
    assignments,
    members,
    roles,
);
