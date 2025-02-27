"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = __importDefault(require("./swaggerOptions"));
const db_1 = __importDefault(require("./config/db"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const warehouseRoutes_1 = __importDefault(require("./routes/warehouseRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const cartItemRoutes_1 = __importDefault(require("./routes/cartItemRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const sellerRoutes_1 = __importDefault(require("./routes/sellerRoutes"));
const productTypeRoutes_1 = __importDefault(require("./routes/productTypeRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env['PORT'];
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerSpecs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecs));
app.use('/users', UserRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/products', productRoutes_1.default);
app.use('/categories', categoryRoutes_1.default);
app.use('/orders', orderRoutes_1.default);
app.use('/warehouses', warehouseRoutes_1.default);
app.use('/inventory', inventoryRoutes_1.default);
app.use('/carts', cartRoutes_1.default);
app.use('/cartItems', cartItemRoutes_1.default);
app.use('/reviews', reviewRoutes_1.default);
app.use('/sellers', sellerRoutes_1.default);
app.use('/product-types', productTypeRoutes_1.default);
(0, db_1.default)();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map