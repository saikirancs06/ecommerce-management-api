CREATE DATABASE ecommerce_management;

USE ecommerce_management;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO products (name, category, price, stock)
VALUES
    ('Laptop', 'Electronics', 55000.00, 10),
    ('Wireless Mouse', 'Accessories', 799.00, 50),
    ('Keyboard', 'Accessories', 1499.00, 25),
    ('Monitor', 'Electronics', 12000.00, 15);

SELECT * FROM products;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO orders (product_id, quantity, unit_price)
VALUES
(1, 2, 58000.00),
(2, 5, 799.00),
(3, 3, 1499.00),
(4, 2, 12000.00),
(1, 1, 58000.00);
