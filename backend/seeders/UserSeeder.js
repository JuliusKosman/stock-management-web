const db = require('../models');
const bcrypt = require('bcryptjs');

async function seedAdminUser() {
  try {
    await db.sequelize.authenticate(); // cukup authenticate, tidak perlu sync

    const hashed1 = await bcrypt.hash('admin123', 10);
    const hashed2 = await bcrypt.hash('julius123', 10);

    await db.User.create({
      username: 'Admin',
      email: 'admin@gmail.com',
      password: hashed1,
      role: 'admin'
    });

    await db.User.create({
      username: 'Julius',
      email: 'julius@gmail.com',
      password: hashed2,
      role: 'admin'
    });

    console.log('Admin users created successfully.');
    process.exit();
  } catch (err) {
    console.error('Failed to create admin user:', err.message);
    process.exit(1);
  }
}

seedAdminUser();
