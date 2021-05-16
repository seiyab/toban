#![allow(missing_docs, trivial_casts, unused_variables, unused_mut, unused_imports, unused_extern_crates, non_camel_case_types)]

use async_trait::async_trait;
use futures::Stream;
use std::error::Error;
use std::task::{Poll, Context};
use swagger::{ApiError, ContextWrapper};
use serde::{Serialize, Deserialize};

type ServiceError = Box<dyn Error + Send + Sync + 'static>;

pub const BASE_PATH: &'static str = "";
pub const API_VERSION: &'static str = "2.0.0";

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[must_use]
pub enum GetVersionDetailsv2Response {
    /// 200 response
    Status200
    ,
    /// 203 response
    Status203
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[must_use]
pub enum ListVersionsv2Response {
    /// 200 response
    Status200
    ,
    /// 300 response
    Status300
}

/// API
#[async_trait]
pub trait Api<C: Send + Sync> {
    fn poll_ready(&self, _cx: &mut Context) -> Poll<Result<(), Box<dyn Error + Send + Sync + 'static>>> {
        Poll::Ready(Ok(()))
    }

    /// Show API version details
    async fn get_version_detailsv2(
        &self,
        context: &C) -> Result<GetVersionDetailsv2Response, ApiError>;

    /// List API versions
    async fn list_versionsv2(
        &self,
        context: &C) -> Result<ListVersionsv2Response, ApiError>;

}

/// API where `Context` isn't passed on every API call
#[async_trait]
pub trait ApiNoContext<C: Send + Sync> {

    fn poll_ready(&self, _cx: &mut Context) -> Poll<Result<(), Box<dyn Error + Send + Sync + 'static>>>;

    fn context(&self) -> &C;

    /// Show API version details
    async fn get_version_detailsv2(
        &self,
        ) -> Result<GetVersionDetailsv2Response, ApiError>;

    /// List API versions
    async fn list_versionsv2(
        &self,
        ) -> Result<ListVersionsv2Response, ApiError>;

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

    /// Show API version details
    async fn get_version_detailsv2(
        &self,
        ) -> Result<GetVersionDetailsv2Response, ApiError>
    {
        let context = self.context().clone();
        self.api().get_version_detailsv2(&context).await
    }

    /// List API versions
    async fn list_versionsv2(
        &self,
        ) -> Result<ListVersionsv2Response, ApiError>
    {
        let context = self.context().clone();
        self.api().list_versionsv2(&context).await
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
