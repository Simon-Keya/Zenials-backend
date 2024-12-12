import app from './app';
import sequelize from './src/config/database';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error:any) {
    console.error('Error connecting to the database:', error.message);
  }
})();
