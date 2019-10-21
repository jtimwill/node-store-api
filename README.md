# Store API

## Project Description
The basic technology stack is:
* Sequelize + PostgreSQL/SQLite (database)
* Express (web server)
* Jest (testing framework)
* Node.js (run-time environment)

## Project Setup


Additional resources that helped me:


## App Structure


## Entity Relationship Diagram
<p align="center">
  <img alt="Image of ERD" src="https://raw.github.com/jtimwill/store-api/master/images/store-erd.png"/>
</p>

## Routes and Resources
### Users Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/users|POST|create a new user|No|
/api/users|GET|return all users|Yes|
/api/users/me|GET|return current user|No|
/api/users/me|PUT|update current user|No|
/api/users/:id|DELETE|delete a user|Yes|
### Reviews Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/reviews|POST|create a new review|No|
/api/reviews|GET|return all reviews|No|
/api/reviews/:id|GET|return a specific review|No|
/api/reviews/:id|PUT|update a specific review|No|
/api/reviews/:id|DELETE|delete a specific review|No|

### Products Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/products|POST|create a new product|Yes|
/api/products|GET|return all products|No|
/api/products/:id|GET|return a specific product|No|
/api/product/:id|PUT|update a specific product|Yes|
/api/product/:id|DELETE|delete a specific product|Yes|

### Category Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/categories|POST|create a new category|Yes|
/api/categories/:id|GET|return a specific category|Yes|
/api/categories|GET|return all categories|No|
/api/categories/:id|PUT|update a specific category|Yes|
/api/categories/:id|DELETE|delete a specific category|Yes|

### Shipping Options Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/shipping_options|POST|create a new shipping option|Yes|
/api/shipping_options/:id|GET|return a specific shipping option|No|
/api/shipping_options|GET|return all shipping options|No|
/api/shipping_options/:id|PUT|update a specific shipping option|Yes|
/api/shipping_options/:id|DELETE|delete a specific shipping option|Yes|

### Cart Products Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/cart_products|GET|return all cart_products|No|
/api/cart_products|POST|add a cart_product|No|
/api/cart_products/:id|PUT|update a specific cart_product|No|
/api/cart_products/:id|DELETE|delete a specific cart_product|No|

### Orders Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/orders|POST|Create a new order and associated order_products|No|
/api/orders|GET|return all orders and associated order_products for current user|No|
/api/orders/:id|GET|return a specific order and associated order_products for current user|No|
/api/orders/:id|PUT|update a specific order and associated order_products|Yes|
/api/orders/:id|DELETE|delete a specific order and associated order_products|Yes|

### Order Products Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/orders/:orderId/order_products/:id|PUT|update a specific order_product|Yes|
/api/orders/:orderId/order_products/:id|DELETE|delete a specific order_product|Yes|

### Login Resource
|URL|HTTP verb|Result|Admin only?|
|---|---|---|---|
/api/login|POST|return a new JSON web token or cookie that can be used to identify the current user|No|
