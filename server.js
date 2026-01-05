import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { swaggerDocs } from './swagger.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

import userRoutes from './routes/userRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import responseRoutes from './routes/responseRoutes.js';
import environmentRoutes from './routes/environmentRoutes.js';
import historyRoutes from './routes/historyRoutes.js';



// Routes
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/environments', environmentRoutes);
app.use('/api/history', historyRoutes);
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});