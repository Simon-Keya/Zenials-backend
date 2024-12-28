import express from 'express';
import { json, urlencoded } from 'express';
import { config } from './src/config/env';
import badgeRoutes from './src/routes/badgeRoutes';
import authRoutes from './src/routes/authRoutes';
import uploadRoutes from './src/routes/uploadRoutes';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/badges', badgeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
