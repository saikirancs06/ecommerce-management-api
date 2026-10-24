# E-Commerce Management & Analytics API

## Project Overview

A RESTful backend service built using Node.js, Express.js, and MySQL to manage e-commerce products and inventory and generate sales analytics. The API supports CRUD operations, input validation, relational database queries, and sales reporting.

## Features

- **Product Management:** Create, retrieve, update, and delete products.
- **Sales Summary:** Retrieve total orders, units sold, and total revenue.
- **Top-Selling Products:** Rank products by units sold and revenue.
- **Daily Sales Analytics:** Group order counts and revenue by date.
- **Input Validation:** Reject invalid product data.
- **Error Handling:** Return appropriate HTTP status codes for invalid requests and missing products.
- **Database Integration:** Use MySQL with asynchronous queries and parameterized SQL statements.

## Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- Postman
- Git and GitHub

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API status |
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve a product by ID |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/analytics/summary` | Get sales summary |
| GET | `/api/analytics/top-products` | Retrieve product sales rankings |
| GET | `/api/analytics/daily-sales` | Retrieve daily sales statistics |

## Installation and Setup

### 1. Prerequisites

Install Node.js, MySQL Server, and Git. Postman is recommended for API testing.

### 2. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ecommerce-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_management
PORT=3000
```

Replace `your_mysql_password` with your local MySQL password.

### 5. Set up the database

Create a MySQL database named `ecommerce_management` and create the `products` and `orders` tables using the SQL schema included in the project.

Add sample product and order records for testing.

### 6. Start the server

```bash
node server.js
```

The API will run at `http://localhost:3000`.

## Testing

Use Postman to test the API endpoints. The main CRUD operations, analytics endpoints, invalid-product validation, and missing-product handling have been manually tested.

Automated regression tests are a potential future enhancement.

## Skills Demonstrated

REST API development, asynchronous JavaScript, Express middleware, relational database design, SQL joins, aggregation functions, input validation, error handling, environment-based configuration, and API testing.

## Future Enhancements

- Automated API regression tests
- Pagination, filtering, and search
- Customer management and order creation endpoints
- Authentication and role-based authorization
- Inventory updates when orders are placed
- API documentation using Swagger

## Author

C S Sai Kiran 
