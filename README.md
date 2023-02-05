# us-cities

## Initial steps

### 1. install packages

```
# npm install
```

### 2. build modules

```
# npm run build
```

### 2. import data

```
# npm run import
```

## Apps to use

- ### tree-output
  outputs ascii tree view to stdout **(I recommend to run this script only with redirect of stdout to file!)**
  ```
  # npm run tree-output > out.txt
  ```
- ### api
  REST api for access to database and tree structure
  ```
  # npm run api
  ```
- ### viewer
  React app displaying tree view of the data. Includes full-text search component for states, counties and cities
  **(uses api, please run the api in another terminal for this app to work properly)**
  ```
  # npm run viewer
  ```
  _This command runs vite dev server_

## Implementation notes

### monorepo

I wanted to organize the code in monorepo. I already tried turborepo in of my small test projects a few weeks ago so this is my second experience with it. I like it a lot.

### database

I used SQLite because it is really simple for initial setup (you don't need to install any database server), and also because I realised I actually never tried to use it. I used knex for a better comfort, I have a production experience with it.

### logging

I used pino just to test if it can be used in monorepo efficiently. It is used just in the import script.

### api

I used fastify as I use it often for Node.JS APIs. The implementation of the API methods is far from the ideal when considering performance, I wanted to achieve the required functionality as simple as possible.

### import

I wanted to do an import in a stream style so it scales nicely for a much larger input data.

### viewer

I used vite as it is zero configuration lightweight solution, it just works, I already used it a few times for small projects. \
I wanted to design the viewer to load counties and cities asynchronously because all cities loaded in the view would not be a very responsive solution. I wanted to use the existing tree view component for react. I was really surprised there are just a few libraries to use. I tried some of them and spend more than an hour with _react-hyper-tree_ but I was not able to figure out why loading children asynchronously doesn't work so I decided to write the whole stuff from scratch. Took me less than an hour in the end but it is a really rough implementation and definitely not production ready. I used tailwind for simple styling, it is easy to use. I have a little experience with it.

### city-tree (transforming algorithm)

I added hash tables for time complexity improvement, which, of course, increases memory usage of the algorithm.
