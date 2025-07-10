const db = require('../models');
const bcrypt = require('bcryptjs');

async function seedAdminUser() {
  try {
    await db.sequelize.sync();

    await db.User.create({
      username: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$10$8IHKYnC6vHsLEJcOugcNGu7ljLShgoXksDSxena0vJi',
      role: 'admin'
    });
    await db.User.create({
      username: 'Julius',
      email: 'julius@gmail.com',
      password: '$2a$12$6XfTX8YPG14xBkwwHU91Bet/BgSwz2oU4MYig0EANHZ',
      role: 'admin'
    });
    console.log('Admin user dibuat');

    process.exit();
  } catch (err) {
    console.error('Gagal membuat admin user:', err.message);
    process.exit(1);
  }
}

seedAdminUser();
