//! Main library entry point for openapi_client implementation.

#![allow(unused_imports)]

use async_trait::async_trait;
use futures::{future, Stream, StreamExt, TryFutureExt, TryStreamExt};
use hyper::server::conn::Http;
use hyper::service::Service;
use log::info;
#[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "ios")))]
use openssl::ssl::SslAcceptorBuilder;
use std::future::Future;
use std::marker::PhantomData;
use std::net::SocketAddr;
use std::sync::{Arc, Mutex};
use std::task::{Context, Poll};
use swagger::{Has, XSpanIdString};
use swagger::auth::MakeAllowAllAuthenticator;
use swagger::EmptyContext;
use tokio::net::TcpListener;

#[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "ios")))]
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};

use openapi_client::models;

/// Builds an SSL implementation for Simple HTTPS from some hard-coded file names
pub async fn create(addr: &str, https: bool) {
    let addr = addr.parse().expect("Failed to parse bind address");

    let server = Server::new();

    let service = MakeService::new(server);

    let service = MakeAllowAllAuthenticator::new(service, "cosmo");

    let mut service =
        openapi_client::server::context::MakeAddContext::<_, EmptyContext>::new(
            service
        );

    if https {
        #[cfg(any(target_os = "macos", target_os = "windows", target_os = "ios"))]
        {
            unimplemented!("SSL is not implemented for the examples on MacOS, Windows or iOS");
        }

        #[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "ios")))]
        {
            let mut ssl = SslAcceptor::mozilla_intermediate_v5(SslMethod::tls()).expect("Failed to create SSL Acceptor");

            // Server authentication
            ssl.set_private_key_file("examples/server-key.pem", SslFiletype::PEM).expect("Failed to set private key");
            ssl.set_certificate_chain_file("examples/server-chain.pem").expect("Failed to set cerificate chain");
            ssl.check_private_key().expect("Failed to check private key");

            let tls_acceptor = Arc::new(ssl.build());
            let mut tcp_listener = TcpListener::bind(&addr).await.unwrap();
            let mut incoming = tcp_listener.incoming();

            while let (Some(tcp), rest) = incoming.into_future().await {
                if let Ok(tcp) = tcp {
                    let addr = tcp.peer_addr().expect("Unable to get remote address");
                    let service = service.call(addr);
                    let tls_acceptor = Arc::clone(&tls_acceptor);

                    tokio::spawn(async move {
                        let tls = tokio_openssl::accept(&*tls_acceptor, tcp).await.map_err(|_| ())?;

                        let service = service.await.map_err(|_| ())?;

                        Http::new().serve_connection(tls, service).await.map_err(|_| ())
                    });
                }

                incoming = rest;
            }
        }
    } else {
        // Using HTTP
        hyper::server::Server::bind(&addr).serve(service).await.unwrap()
    }
}

#[derive(Copy, Clone)]
pub struct Server<C> {
    marker: PhantomData<C>,
}

impl<C> Server<C> {
    pub fn new() -> Self {
        Server{marker: PhantomData}
    }
}


use openapi_client::{
    Api,
    GetAssignmentsResponse,
    GetMembersResponse,
    GetMembersMemberIdResponse,
    GetRolesResponse,
    GetRolesRoleIdResponse,
    PostMembersResponse,
    PostRolesResponse,
};
use openapi_client::server::MakeService;
use std::error::Error;
use swagger::ApiError;

#[async_trait]
impl<C> Api<C> for Server<C> where C: Has<XSpanIdString> + Send + Sync
{
    /// get assignments
    async fn get_assignments(
        &self,
        from: chrono::DateTime::<chrono::Utc>,
        to: chrono::DateTime::<chrono::Utc>,
        context: &C) -> Result<GetAssignmentsResponse, ApiError>
    {
        let context = context.clone();
        info!("get_assignments({}, {}) - X-Span-ID: {:?}", from, to, context.get().0.clone());
        Err("Generic failuare".into())
    }

    /// get members
    async fn get_members(
        &self,
        context: &C) -> Result<GetMembersResponse, ApiError>
    {
        let context = context.clone();
        info!("get_members() - X-Span-ID: {:?}", context.get().0.clone());
        Err("Generic failuare".into())
    }

    /// get a member
    async fn get_members_member_id(
        &self,
        member_id: i32,
        context: &C) -> Result<GetMembersMemberIdResponse, ApiError>
    {
        let context = context.clone();
        info!("get_members_member_id({}) - X-Span-ID: {:?}", member_id, context.get().0.clone());
        Err("Generic failuare".into())
    }

    /// get roles
    async fn get_roles(
        &self,
        context: &C) -> Result<GetRolesResponse, ApiError>
    {
        let context = context.clone();
        info!("get_roles() - X-Span-ID: {:?}", context.get().0.clone());
        Err("Generic failuare".into())
    }

    /// get a role
    async fn get_roles_role_id(
        &self,
        role_id: i32,
        context: &C) -> Result<GetRolesRoleIdResponse, ApiError>
    {
        let context = context.clone();
        info!("get_roles_role_id({}) - X-Span-ID: {:?}", role_id, context.get().0.clone());
        Err("Generic failuare".into())
    }

    /// post a new member
    async fn post_members(
        &self,
        new_member: Option<models::NewMember>,
        context: &C) -> Result<PostMembersResponse, ApiError>
    {
        let context = context.clone();
        info!("post_members({:?}) - X-Span-ID: {:?}", new_member, context.get().0.clone());
        Err("Generic failuare".into())
    }

    /// post a new member
    async fn post_roles(
        &self,
        new_role: Option<models::NewRole>,
        context: &C) -> Result<PostRolesResponse, ApiError>
    {
        let context = context.clone();
        info!("post_roles({:?}) - X-Span-ID: {:?}", new_role, context.get().0.clone());
        Err("Generic failuare".into())
    }

}
