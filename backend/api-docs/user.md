# User API
The user API handles authentication and creation of accounts. 

Endpoints:
- POST /api/user/login
- POST /api/user/register
- POST /api/user/logout
- POST /api/user/username

## Logging in user
POST /api/user/login

Sends a login request and if authenticated, receives back a JWT for use when making further requests that needs authentication.

### Parameters
| Parameter | Type   | Optional | Description |
| :-------- | :----- | :------- | :---------- |
| username  | String |          |             |
| password  | String |          |             |

### Request example
```json
{
   "username":"username",
   "password":"password"
}
```

### Returns
A object with JWT.

### Response example
```json
{
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWQ5M2MxMGRmNDFmMzQwZDExMWRlMDgiLCJjcmVhdGVkIjoxNTkxOTEyNTQ3OTE1LCJpYXQiOjE1OTE5MTI1NDcsImV4cCI6MTU5MTkzMDU0N30.LCXWJZlTgZ18p-cpmacAePS2j2D8BDgGMEfzwx4RWGE"
}
```

## Registering user
POST /api/user/register

Sends a registering request and if the username is available and a valid password is provided, receives back a JWT for use when making further requests that needs authentication.

### Parameters
| Parameter | Type   | Optional | Description |
| :-------- | :----- | :------- | :---------- |
| username  | String |          |             |
| password  | String |          |             |

### Request example
```json
{
   "username":"username",
   "password":"password"
}
```

### Returns
A object with JWT.

### Response example
```json
{
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWQ5M2MxMGRmNDFmMzQwZDExMWRlMDgiLCJjcmVhdGVkIjoxNTkxOTEyNTQ3OTE1LCJpYXQiOjE1OTE5MTI1NDcsImV4cCI6MTU5MTkzMDU0N30.LCXWJZlTgZ18p-cpmacAePS2j2D8BDgGMEfzwx4RWGE"
}
```

## Logging out user
POST /api/user/logout

Logging out the user.

### Parameters
No parameters.

### Returns
A logout flag.

### Response example
```json
{
   "logout":true
}
```

## Checking username availability
POST /api/user/username

Checks if the specified username is already in use.

### Parameters
| Parameter | Type   | Optional | Description                        |
| :-------- | :----- | :------- | :--------------------------------- |
| username  | String |          | Username to check for availability |

### Request example
```json
{
   "username":"usernametobechecked"
}
```

### Returns
Returns a usernameExists property to signal if the username already is in use.

### Response example
```json
{
   "usernameExists":false
}
```
