# default_api

All URIs are relative to *http://localhost:8080/api*

Method | HTTP request | Description
------------- | ------------- | -------------
**get_members**](default_api.md#get_members) | **GET** /members | get members
**get_members_member_id**](default_api.md#get_members_member_id) | **GET** /members/{member_id} | get a member
**get_roles**](default_api.md#get_roles) | **GET** /roles | get roles
**get_roles_role_id**](default_api.md#get_roles_role_id) | **GET** /roles/{role_id} | get a role


# **get_members**
> Vec<models::Member> get_members()
get members

### Required Parameters
This endpoint does not need any parameter.

### Return type

[**Vec<models::Member>**](Member.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_members_member_id**
> models::Member get_members_member_id(member_id)
get a member

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
  **member_id** | **i32**|  | 

### Return type

[**models::Member**](Member.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_roles**
> Vec<models::Role> get_roles()
get roles

### Required Parameters
This endpoint does not need any parameter.

### Return type

[**Vec<models::Role>**](Role.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_roles_role_id**
> models::Role get_roles_role_id(role_id)
get a role

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
  **role_id** | **i32**|  | 

### Return type

[**models::Role**](Role.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

