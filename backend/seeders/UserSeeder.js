const db = require('../models');

async function seed() {
  try {
    await db.User.destroy({ where: {}, truncate: true });

    await db.User.create({
      username: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin'
    });

    await db.User.create({
      username: 'Julius',
      email: 'julius@gmail.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin users berhasil disisipkan');
  } catch (err) {
    console.error('Gagal membuat admin user :', err.message);
  }
}

module.exports = { seed };
