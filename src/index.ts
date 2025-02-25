import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions'; // Import swaggerOptions
import connectDB from './config/db';
// Import routes
import userRoutes from './routes/UserRoutes';
//import productRoutes from './routes/productRoutes';
// Import other routes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes'; 
import warehouseRoutes from './routes/warehouseRoutes'; //Import the warehouse routes
import inventoryRoutes from './routes/inventoryRoutes' //Import inventory routes
import cartRoutes from './routes/cartRoutes';
import cartItemRoutes from './routes/cartItemRoutes';
import reviewRoutes from './routes/reviewRoutes';

dotenv.config();

const app: Application = express();
const port  = process.env['PORT'];
// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/users', userRoutes);
//app.use('/products', productRoutes);
// Use other routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes); //Use
app.use('/warehouses', warehouseRoutes); //Use the warehouse routes
app.use('/inventory', inventoryRoutes);
app.use('/carts', cartRoutes);
app.use('/cartItems', cartItemRoutes)
app.use('/reviews', reviewRoutes);

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});