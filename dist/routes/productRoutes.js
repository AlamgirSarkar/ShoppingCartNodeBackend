"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.get('/', productController_1.getAllProducts);
router.get('/:id', productController_1.getProductById);
router.get('/category/:categoryId', productController_1.getProductsByCategory);
router.post('/', authMiddleware_1.authenticate, productController_1.createProduct);
router.put('/:id', authMiddleware_1.authenticate, productController_1.updateProduct);
router.delete('/:id', authMiddleware_1.authenticate, productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map