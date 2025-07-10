const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const seedAdminUser = require('./seeders/UserSeeder');

const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const arimaRoutes = require('./routes/arimaRoutes');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://jcstock.vercel.app',
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', barangRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/arima', arimaRoutes);

app.get('/', (req, res) => res.send('API Stock Management Running...'));

// Scheduler
require('./schedulers/arimaJob');

const PORT = process.env.PORT || 3000;

db.sequelize.sync()
  .then(async () => {
    console.log('Database connected & synced.');

    try {
      const { seed } = require('./seeders/UserSeeder');
      await seed();
      console.log('Seeder selesai dijalankan');
    } catch (err) {
      console.error('Seeder gagal dijalankan:', err.message);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal koneksi DB:', err.message);
  });



