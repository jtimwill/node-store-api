const config = require('config');
const db = config.get('db');
let sequelize;
const Sequelize = require('sequelize');

// Import model definitions
const UserModel = require('./models/user');
const ReviewModel = require('./models/review');
const ProductModel = require('./models/product');
const CategoryModel = require('./models/category');
const CartProductModel = require('./models/cart_product');
const OrderProductModel = require('./models/order_product');
const ShippingOptionModel = require('./models/shipping_option');
const OrderModel = require('./models/order');

app.use('/api/users', users);
app.use('/api/reviews', reviews);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/cart_products', cart_products);
app.use('/api/order_products', order_products);
app.use('/api/shipping_options', shipping_options);
app.use('/api/orders', orders);
app.use('/api/login', login);

// Create sequelize instance
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres'
  });
} else {
  sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: db
  });
}

// Use sequelize instance and Sequelize constructor to create model classes
const User = UserModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const CartProduct = CartProductModel(sequelize, Sequelize);
const OrderProduct = OrderProductModel(sequelize, Sequelize);
const ShippingOption = ShippingOptionModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
// Create associations between models
User.hasMany(CartProduct);
User.hasMany(Order);
User.hasMany(Review);
Product.hasMany(Review, {onDelete: 'cascade'});
OrderProduct.belongsTo(Product);
CartProduct.belongsTo(Product);
Category.hasMany(Product);
ShippingOption.hasMany(Order);
Order.hasMany(OrderProduct);

// Create database tables
sequelize.sync().then(() => {
  console.log("Database and tables created");
});

module.exports = {
  User,
  Review,
  Product,
  Category,
  ShippingOption,
  Order,
  sequelize
};
