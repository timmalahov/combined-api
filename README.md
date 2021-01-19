# Combined-api

This is an application that provides an api for posts and users.

Clone this repository and try it out by running:

```
npm install
npm run start:dev
```

Supported endpoints and requests are listed below:

`/posts`

```http://localhost:3000/api/posts/34 - post by id

/posts?limit=5 - posts from the first to the limit (1 - 5 in case of this example)

/posts?offset=10&limit=5 - posts from 11 to 15 (pagination by offset and limit)

/posts?userId=5 - all posts from user with id 5

/posts?userId=5&offset=10&limit=5 - all posts from user with id 5 with pagination

/posts?name=hello world - all the posts with title field, containing "hello world" ("hello world and allit's inhabitats" - will match)
```


`/users`
```
/users/11 - user by id

/users?limit=5 - users from the first to the limit (1 - 5 in case of this example)

/users?offset=5&limit=5 - users from 6 to 10 (pagination by offset and limit)

/users?id=5 - user with id equals 5

/users?name=ev - all the posts with full name, containing "ev" ("Steve Helbert" and "Genevieve Marks" - will match)
```
