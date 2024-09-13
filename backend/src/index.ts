import 'tsconfig-paths/register';
import express from 'express';
import connectDB from '@/config/db';
import topicRoutes from '@/routes/topic.routes';
import userRoutes from '@/routes/user.routes';
import contentRoutes from '@/routes/content.routes';
import roleRoutes from '@/routes/role.routes';
import { setupSwagger } from '@/swagger';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  connectDB(); 
}

app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/roles', roleRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
