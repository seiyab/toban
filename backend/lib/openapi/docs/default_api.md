# default_api

All URIs are relative to *http://localhost:8080/api*

Method | HTTP request | Description
------------- | ------------- | -------------
**get_assignments**](default_api.md#get_assignments) | **GET** /assignments | get assignments
**get_members**](default_api.md#get_members) | **GET** /members | get members
**get_members_member_id**](default_api.md#get_members_member_id) | **GET** /members/{member_id} | get a member
**get_roles**](default_api.md#get_roles) | **GET** /roles | get roles
**get_roles_role_id**](default_api.md#get_roles_role_id) | **GET** /roles/{role_id} | get a role
**post_members**](default_api.md#post_members) | **POST** /members | post a new member
**post_roles**](default_api.md#post_roles) | **POST** /roles | post a new member


# **get_assignments**
> Vec<models::Assignment> get_assignments(from, to)
get assignments

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
  **from** | **chrono::DateTime::<chrono::Utc>**|  | 
  **to** | **chrono::DateTime::<chrono::Utc>**|  | 

### Return type

[**Vec<models::Assignment>**](Assignment.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

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

# **post_members**
> models::New post_members(optional)
post a new member

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **new_member** | [**NewMember**](NewMember.md)|  | 

### Return type

[**models::New**](New.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_roles**
> models::New post_roles(optional)
post a new member

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **new_role** | [**NewRole**](NewRole.md)|  | 

### Return type

[**models::New**](New.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

