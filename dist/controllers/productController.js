"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategory = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const Products_1 = __importDefault(require("../models/Products"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllProducts = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products_1.default.findById(req.params['id']);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Products_1.default({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        image_url: req.body.image_url
    });
    try {
        const newProduct = yield product.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products_1.default.findById(req.params['id']);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.name != null) {
            product.name = req.body.name;
        }
        if (req.body.description != null) {
            product.description = req.body.description;
        }
        if (req.body.price != null) {
            product.price = req.body.price;
        }
        if (req.body.category_id != null) {
            product.category_id = req.body.category_id;
        }
        if (req.body.image_url != null) {
            product.image_url = req.body.image_url;
        }
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products_1.default.findById(req.params['id']);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        yield product.deleteOne();
        res.json({ message: 'Deleted Product' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteProduct = deleteProduct;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params['categoryId'];
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }
        const products = yield Products_1.default.find({ category_id: categoryId });
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProductsByCategory = getProductsByCategory;
//# sourceMappingURL=productController.js.map