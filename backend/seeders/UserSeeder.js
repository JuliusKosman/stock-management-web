const db = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    await db.sequelize.authenticate();

    await db.User.findOrCreate({
      where: { email: 'admin@gmail.com' },
      defaults: {
        username: 'Admin',
        password: 'admin123',
        role: 'admin'
      }
    });

    await db.User.findOrCreate({
      where: { email: 'julius@gmail.com' },
      defaults: {
        username: 'Julius',
        password: 'admin123',
        role: 'admin'
      }
    });

    console.log('Admin users berhasil disisipkan');
  } catch (err) {
    console.error('Gagal membuat admin user:', err.message);
  }
}

module.exports = { seed };
