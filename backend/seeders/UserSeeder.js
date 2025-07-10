const db = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await db.sequelize.authenticate();

    const hashed1 = await bcrypt.hash('admin123', 10);
    const hashed2 = await bcrypt.hash('julius123', 10);

    await db.User.findOrCreate({
      where: { email: 'admin@gmail.com' },
      defaults: {
        username: 'Admin',
        password: hashed1,
        role: 'admin'
      }
    });

    await db.User.findOrCreate({
      where: { email: 'julius@gmail.com' },
      defaults: {
        username: 'Julius',
        password: hashed2,
        role: 'admin'
      }
    });

    console.log('Admin users berhasil disisipkan');
  } catch (err) {
    console.error('Gagal membuat admin user:', err.message);
  }
}

module.exports = { seed };
