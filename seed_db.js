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


    console.log("Success!");
  } catch(err) {
    console.log("ERROR! Try Again!");
  }

  await sequelize.close();
})();
