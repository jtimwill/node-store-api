const {   User,
          Review,
          Product,
          Category,
          ShippingOption,
          Order,
          OrderProduct,
          CartProduct,
          sequelize } = require('./sequelize');
const bcrypt = require('bcrypt');
const config = require('config');

(async () => {
  try {
    await sequelize.sync({force: true}); // Reset database
    const salt_value = Number(config.get("bcrypt_salt"));
    const salt = await bcrypt.genSalt(salt_value);
    const password_digest = await bcrypt.hash("123456", salt);

    // Create Admin User
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password_digest: '123456',
      admin: true
    });
    // Create User1
    const user_1 = await User.create({
      username: 'adam',
      email: 'adam@example.com',
      password_digest: '123456',
      admin: false
    });
    // Create User2
    const user_2 = await User.create({
      username: 'bob',
      email: 'bob@example.com',
      password_digest: '123456',
      admin: false
    });
    // Create User3
    const user_3 = await User.create({
      username: 'mary',
      email: 'mary@example.com',
      password_digest: '123456',
      admin: false
    });

    // Create Categories
    const food = await Category.create({ name: 'Sports' });
    const transportation = await Category.create({ name: 'Transportation' });

    // Shipping_options
    const shipping_1 = await ShippingOption.create({
      title: 'standard', description: "d1", cost: 0.00
    });
    const shipping_2 = await ShippingOption.create({
      title: 'one-day', description: "d2",  cost: 5.99
    });

    // Orders
    const order_1 = await Order.create({
      userId: user_1.id, shippingOptionId: shipping_1.id
    });
    const order_2 = await Order.create({
      userId: user_1.id, shippingOptionId: shipping_2.id
    });

    const des = `Curabitur a lectus bibendum tellus aliquet imperdiet. Sed ut condimentum libero. In pellentesque euismod purus in commodo. Nunc pretium ligula mi, in efficitur enim aliquam vel. Aenean sagittis maximus sagittis. Integer est arcu, aliquet et faucibus non, pulvinar vel nunc. Donec vestibulum metus pretium faucibus facilisis. Pellentesque vel diam risus.`;
    const rev = `Nunc pretium ligula mi, in efficitur enim aliquam vel. Aenean sagittis maximus sagittis. Integer est arcu, aliquet et faucibus non, pulvinar vel nunc. Donec vestibulum metus pretium faucibus facilisis.`;

    const product_1 = await Product.create({
      title: 'Coffee',
      description: des,
      price: 2.99,
      small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-coffee",
      large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-coffee",
      categoryId: food.id,
    });
    const product_2 = await Product.create({
      title: 'Birthday Cake',
      description: des,
      price: 9.99,
      small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-birthday-cake",
      large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-birthday-cake",
      categoryId: food.id,
    });
    const product_3 = await Product.create({
      title: 'Beer',
      description: des,
      price: 5.99,
      small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-beer",
      large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-beer",
      categoryId: food.id,
    });

    await Product.bulkCreate([
      {
        title: 'Super Soldier Serum',
        description: des,
        price: 10000000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-flask",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-flask",
        categoryId: food.id,
      },
      {
        title: 'Martini',
        description: des,
        price: 7.99,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-glass",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-glass",
        categoryId: food.id,
      },
      {
        title: 'Wheelchair',
        description: des,
        price: 399.99,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-wheelchair",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-wheelchair",
        categoryId: transportation.id,
      },
      {
        title: 'Car',
        description: des,
        price: 30000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-car",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-car",
        categoryId: transportation.id,
      },
      {
        title: 'Bicycle',
        description: des,
        price: 300.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-bicycle",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-bicycle",
        categoryId: transportation.id,
      },
      {
        title: 'Bus',
        description: des,
        price: 100000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-bus",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-bus",
        categoryId: transportation.id,
      },
      {
        title: 'Space Shuttle',
        description: des,
        price: 200000000000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-space-shuttle",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-space-shuttle",
        categoryId: transportation.id,
      },
      {
        title: 'Ambulance',
        description: des,
        price: 50000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-ambulance",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-ambulance",
        categoryId: transportation.id,
      },
      {
        title: 'Motorcycle',
        description: des,
        price: 15000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-motorcycle",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-motorcycle",
        categoryId: transportation.id,
      },
      {
        title: 'Truck',
        description: des,
        price: 45000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/fa-truck",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/fa-truck",
        categoryId: transportation.id,
      },
      {
        title: 'Fighter Jet',
        description: des,
        price: 150000000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/ion-jet",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/ion-jet",
        categoryId: transportation.id,
      },
      {
        title: 'Tesla Model S',
        description: des,
        price: 150000000.00,
        small_image_path: "https://imgplaceholder.com/175x175/transparent/000000/ion-model-s",
        large_image_path: "https://imgplaceholder.com/665x375/transparent/000000/ion-model-s",
        categoryId: transportation.id,
      }
    ]);

    // Ordered Products
    await OrderProduct.bulkCreate([
      { orderId: order_1.id, productId: product_1.id, price: 1.99, quantity: 2 },
      { orderId: order_2.id, productId: product_2.id, price: 9.49, quantity: 1 },
      { orderId: order_2.id, productId: product_3.id, price: 11.98, quantity: 2 }
    ]);


    // Cart Products (only for main user)
    await CartProduct.bulkCreate([
      {
        quantity: 2,
        productId: product_1.id,
        userId: user_1.id
      },
      {
        quantity: 1,
        productId: product_3.id,
        userId: user_1.id
      },
      {
        quantity: 1,
        productId: product_2.id,
        userId: user_1.id
      }
    ]);

    // Reviews
    await Review.bulkCreate([
      { productId: product_1.id, userId: user_1.id, title: 'Great', body: rev, rating: 5 },
      { productId: product_2.id, userId: user_2.id, title: 'Bad', body: rev, rating: 1 },
      { productId: product_2.id, userId: user_3.id, title: 'Okay', body: rev, rating: 2 },
      { productId: product_2.id, userId: user_1.id, title: 'Meh', body: rev, rating: 3 }
    ]);

    console.log("Success!");
  } catch(err) {
    console.log("ERROR! Try Again!");
    console.log("Error info: " + err);
  }

  await sequelize.close();
})();
