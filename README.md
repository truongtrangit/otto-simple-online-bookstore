# otto-simple-online-bookstore

This repository is a assignment for interview of otto international company

## How to run

1. Install all dependencies

```
npm install
```

2. Copy .env.example to .env

```
cp .env.example .env
```

3. Run the project in development mode

```
npm run dev
```

4. API documentation

- **URL:** `http://localhost:3000/api-docs`

## API Endpoints

### Books

#### Retrieve all books

- **URL:** `GET /api/books`
- **Description:** Retrieve a list of all books.
- **Query Parameters:**
  - `page` (integer, optional): The page number for pagination.
  - `limit` (integer, optional): The number of books per page.
  - `id` (string, optional): Filter books by ID.
  - `isbn` (string, optional): Filter books by ISBN.
  - `authorId` (string, optional): Filter books by author.
  - `categoryId` (string, optional): Filter books by category.
  - `startPrice` (number, optional): Filter books by price range (start).
  - `endPrice` (number, optional): Filter books by price range (end).
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id": "1",
        "title": "Book Title",
        "author": "Author Name",
        "publishedDate": "2023-01-01",
        "isbn": "123-4567890123"
      },
      ...
    ]
    ```

#### Retrieve a specific book by ID/ISBN

- **URL:** `GET /api/books/:id`
- **Description:** Retrieve details of a specific book by its ID/ISBN.
- **Parameters:**
  - `id` (string, required): The ID or ISBN of the book.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "id": "1",
      "title": "Book Title",
      "author": "Author Name",
      "publishedDate": "2023-01-01",
      "isbn": "123-4567890123"
    }
    ```

#### Create a new book

- **URL:** `POST /api/books`
- **Description:** Create a new book.
- **Request Body:**
  - **Content-Type:** application/json
  - **Body:**
    ```json
    {
      "title": "New Book Title",
      "price": "1999000",
      "isbn": "123-4567890123",
      "authorId": "ObjectId",
      "categoryId": "ObjectId"
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": "2",
      "title": "New Book Title",
      "price": "1999000",
      "isbn": "123-4567890123",
      "author": "ObjectId",
      "category": "ObjectId",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
    ```
  - **Status:** 400 Bad Request (Invalid param | Invalid ISBN)
  - **Status:** 404 Not Found (if the author or category is not found | ISBN already used)

#### Update a book by ID/ISBN

- **URL:** `PUT /api/books/:id`
- **Description:** Update the details of a book by its ID/ISBN.
- **Parameters:**
  - `id` (string, required): The ID or ISBN of the book.
- **Request Body:**
  - **Content-Type:** application/json
  - **Body:**
    ```json
    {
      "title": "Updated Book Title",
      "authorId": "ObjectId",
      "categoryId": "ObjectId",
      "price": "2999000"
    }
    ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "id": "1",
      "title": "Updated Book Title",
      "author": "ObjectId",
      "category": "ObjectId",
      "isbn": "123-4567890123",
      "price": "299"
    }
    ```
  - **Status:** 404 Not Found (if the book/category/author is not found)

#### Delete a book by ID/ISBN

- **URL:** `DELETE /api/books/:id`
- **Description:** Delete a book by its ID/ISBN.
- **Parameters:**
  - `id` (string, required): The ID/ISBN of the book.
- **Response:**
  - **Status:** 200
  - **Status:** 404 Not Found (if the book is not found)

### Categories

#### Retrieve all categories

- **URL:** `GET /api/categories`
- **Description:** Retrieve a list of all categories.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id": "1",
        "name": "Fiction"
      },
      ...
    ]
    ```

#### Create a new category

- **URL:** `POST /api/categories`
- **Description:** Create a new category.
- **Request Body:**
  - **Content-Type:** application/json
  - **Body:**
    ```json
    {
      "name": "New Category"
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": "2",
      "name": "New Category"
    }
    ```

### Authors

#### Retrieve all authors

- **URL:** `GET /api/authors`
- **Description:** Retrieve a list of all authors.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id": "1",
        "name": "Author Name",
        "birthDate": "1990-01-01",
        "nationality": "Country"
      },
      ...
    ]
    ```

#### Create a new author

- **URL:** `POST /api/authors`
- **Description:** Create a new author.
- **Request Body:**
  - **Content-Type:** application/json
  - **Body:**
    ```json
    {
      "name": "New Author",
      "birthDate": "1990-01-01",
      "nationality": "Country"
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": "2",
      "name": "New Author",
      "birthDate": "1990-01-01",
      "nationality": "Country"
    }
    ```

### Reviews

#### Create a new review

- **URL:** `POST /api/reviews`
- **Description:** Create a new review.
- **Request Body:**
  - **Content-Type:** application/json
  - **Body:**
    ```json
    {
      "bookId": "1",
      "reviewer": "New Reviewer",
      "content": "Good book!"
    }
    ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "id": "2",
      "bookId": "1",
      "reviewer": "New Reviewer",
      "rating": 4,
      "comment": "Good book!"
    }
    ```
