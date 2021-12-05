# Api Documentation

## Auth related apis

## 1. User Sign up

**URL**: `/api/signup`

**Method**: `POST`

**Auth required**: NO

**Request Body:**
```json
{
  "email": "<any valid email>"
}
```

### Success Response 
**Condition**: `email` is valid, does not exists already and OTP has been sent successfully.

**Code**: `200 OK`

**Response**:
> Note: 6 letter otp is sent to the email with 5 minute expiry time.
```json
{
  "message": "OTP has been sent to your email"
}
```

<br/>

## 2. User Login

**URL**: `/api/login`

**Method**: `POST`

**Auth required**: NO

**Request Body:**
```json
{
  "email": "<any valid email>"
}
```

### Success Response 
**Condition**: `email` is valid and verified, and OTP has been sent successfully.

**Code**: `200 OK`

**Response**:
> Note: 6 letter otp is sent to the email with 5 minute expiry time.
```json
{
  "message": "OTP has been sent to your email"
}
```

<br/>

## 3. Verify OTP

**URL**: `/api/verify-otp`

**Method**: `POST`

**Auth required**: NO

**Request Body:**
```json
{
  "email": "<any valid email>",
  "otp": "<6 digit alphanumeric otp sent at the email>"
}
```

### Success Response 
**Condition**: `email` and `otp` is valid.

**Code**: `200 OK` or `201 Created`

**Responses**:
> Note: a signed jwt token is also returned at a cookie, which is further used for authentication purposes.
- If the email is not verified (i.e. otp is for signup)
```json
{
  "message": "Registration successful!"
}
```

- If the email is verified (i.e. otp is for login)
```json
{
  "message": "Login Successful!",
  "user": {
    "type": "User",
    "id": "61ab8686d9a5b960dc485f7a",
    "name": null,
    "email": "shikharsingh.original@gmail.com",
    "isVerified": true
  }
}
```

<br/>

## 4. Complete Profile

**URL**: `/api/complete-profile`

**Method**: `POST`

**Auth required**: YES (jwt cookie)

**Request Body:**
```json
{
  "firstName": "<max 48 characters alphabets>",
  "lastName": "<max 20 characters (optional)"
}
```

### Success Response 
**Condition**: user is authorized and input is valid.

**Code**: `200 OK`

**Response**:
```json
{
  "message": "User data updated successfully",
  "user": {
    "type": "User",
    "id": "61ab8686d9a5b960dc485f7a",
    "name": "Shikhar Singh",
    "email": "shikharsingh.original@gmail.com",
    "isVerified": true
  }
}
```

## Post related apis

## 1. Create new post.

**URL**: `/api/new-post`

**Method**: `POST`

**Auth required**: YES (jwt cookie)

**Request Body:**
```json
{
  "content": "<max 512 character long text>",
}
```

### Success Response 
**Condition**: user is authorized and input is valid.

**Code**: `201 Created`

**Response**:
```json
{
  "message": "Post created successfully!",
  "post": {
    "id": "61ad1a239d568d258c127c2d",
    "content": "Some content",
    "likes": []
  }
}
```

<br/>

## 2. Add comment to a post.

**URL**: `/api/add-comment`

**Method**: `POST`

**Auth required**: YES (jwt cookie)

**Request Body:**
```json
{
  "content": "<max 512 character long text>",
  "postId": "<id of the post where comment is to be added>"
}
```

### Success Response 
**Condition**: user is authorized and input is valid. post exists.

**Code**: `201 Created`

**Response**:
```json
{
  "message": "Comment added successfully!",
  "comment": {
    "id": "61ad1a979d568d258c127c30",
    "postId": "61ad1a239d568d258c127c2d",
    "content": "Test comment"
  }
}
```

<br/>

## 3. Like a post.

**URL**: `/api/like-post`

**Method**: `POST`

**Auth required**: YES (jwt cookie)

**Request Body:**
```json
{
  "postId": "<id of the post which is to be liked>"
}
```

### Success Response 
**Condition**: user is authorized and input is valid. post exists.

**Code**: `200 OK`

**Response**:
```json
{
  "message": "Comment added successfully!",
  "comment": {
    "id": "61ad1a979d568d258c127c30",
    "postId": "61ad1a239d568d258c127c2d",
    "content": "Test comment"
  }
}
```

<br/>

## 4. Get all comments from a post.

**URL**: `/api/get-comments/[postId]`

**Method**: `GET`

**Auth required**: YES (jwt cookie)

**Request params:** `postId` (id of the post whose comment is requested.)

### Success Response 
**Condition**: user is authorized and input is valid. post exists.

**Code**: `200 OK`

**Response**:
```json
{
  "message": "All Comments",
  "post": {
    "_id": "61ad1a239d568d258c127c2d",
    "content": "Some content",
    "createdBy": {
      "_id": "61ab8686d9a5b960dc485f7a",
      "email": "shikharsingh.original@gmail.com",
      "firstName": "sdfadsf",
      "lastName": "sdfasfd"
    },
    "createdAt": "2021-12-05T19:59:31.100Z"
  },
  "comments": [
    {
      "_id": "61ad1a979d568d258c127c30",
      "content": "Test comment",
      "createdBy": {
        "_id": "61ab8686d9a5b960dc485f7a",
        "email": "shikharsingh.original@gmail.com",
        "firstName": "sdfadsf",
        "lastName": "sdfasfd"
      },
      "createdAt": "2021-12-05T20:01:27.491Z"
    }
  ]
}
```

<br/>

## 5. Delete a post.

**URL**: `/api/delete-post`

**Method**: `DELETE`

**Auth required**: YES (jwt cookie)

**Request Body:**
```json
{
  "postId": "<id of the post which is to be deleted>"
}
```

### Success Response 
**Condition**: user is authorized and input is valid. post exists.

**Code**: `200 OK`

**Response**:
```json
{
  "message": "Post deleted successfully!",
}
```