#![allow(missing_docs, trivial_casts, unused_variables, unused_mut, unused_imports, unused_extern_crates, non_camel_case_types)]

use async_trait::async_trait;
use futures::Stream;
use std::error::Error;
use std::task::{Poll, Context};
use swagger::{ApiError, ContextWrapper};
use serde::{Serialize, Deserialize};

type ServiceError = Box<dyn Error + Send + Sync + 'static>;

pub const BASE_PATH: &'static str = "/api";
pub const API_VERSION: &'static str = "0.0.1";

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub enum GetMembersResponse {
    /// 200 response 
    Status200
    (Vec<models::Member>)
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[must_use]
pub enum GetMembersMemberIdResponse {
    /// 200 response 
    Status200
    (models::Member)
    ,
    /// 404 response 
    Status404
    (models::Error)
}

/// API
#[async_trait]
pub trait Api<C: Send + Sync> {
    fn poll_ready(&self, _cx: &mut Context) -> Poll<Result<(), Box<dyn Error + Send + Sync + 'static>>> {
        Poll::Ready(Ok(()))
    }

    /// get members
    async fn get_members(
        &self,
        context: &C) -> Result<GetMembersResponse, ApiError>;

    /// get a member
    async fn get_members_member_id(
        &self,
        member_id: i32,
        context: &C) -> Result<GetMembersMemberIdResponse, ApiError>;

}

/// API where `Context` isn't passed on every API call
#[async_trait]
pub trait ApiNoContext<C: Send + Sync> {

    fn poll_ready(&self, _cx: &mut Context) -> Poll<Result<(), Box<dyn Error + Send + Sync + 'static>>>;

    fn context(&self) -> &C;

    /// get members
    async fn get_members(
        &self,
        ) -> Result<GetMembersResponse, ApiError>;

    /// get a member
    async fn get_members_member_id(
        &self,
        member_id: i32,
        ) -> Result<GetMembersMemberIdResponse, ApiError>;

}

/// Trait to extend an API to make it easy to bind it to a context.
pub trait ContextWrapperExt<C: Send + Sync> where Self: Sized
{
    /// Binds this API to a context.
    fn with_context(self: Self, context: C) -> ContextWrapper<Self, C>;
}

impl<T: Api<C> + Send + Sync, C: Clone + Send + Sync> ContextWrapperExt<C> for T {
    fn with_context(self: T, context: C) -> ContextWrapper<T, C> {
         ContextWrapper::<T, C>::new(self, context)
    }
}

#[async_trait]
impl<T: Api<C> + Send + Sync, C: Clone + Send + Sync> ApiNoContext<C> for ContextWrapper<T, C> {
    fn poll_ready(&self, cx: &mut Context) -> Poll<Result<(), ServiceError>> {
        self.api().poll_ready(cx)
    }

    fn context(&self) -> &C {
        ContextWrapper::context(self)
    }

    /// get members
    async fn get_members(
        &self,
        ) -> Result<GetMembersResponse, ApiError>
    {
        let context = self.context().clone();
        self.api().get_members(&context).await
    }

    /// get a member
    async fn get_members_member_id(
        &self,
        member_id: i32,
        ) -> Result<GetMembersMemberIdResponse, ApiError>
    {
        let context = self.context().clone();
        self.api().get_members_member_id(member_id, &context).await
    }

}


#[cfg(feature = "client")]
pub mod client;

// Re-export Client as a top-level name
#[cfg(feature = "client")]
pub use client::Client;

#[cfg(feature = "server")]
pub mod server;

// Re-export router() as a top-level name
#[cfg(feature = "server")]
pub use self::server::Service;

#[cfg(feature = "server")]
pub mod context;

pub mod models;

#[cfg(any(feature = "client", feature = "server"))]
pub(crate) mod header;
