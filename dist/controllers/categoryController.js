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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const getAllCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.status(201).json(categories);
    }
    catch (err) {
        res.json({ message: err.message });
        return;
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params['id']);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('requsetbody', req.body);
    const category = new Category_1.default({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newCategory = yield category.save();
        res.status(201).json(newCategory);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params['id']);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        if (req.body.name != null) {
            category.name = req.body.name;
        }
        if (req.body.description != null) {
            category.description = req.body.description;
        }
        const updatedCategory = yield category.save();
        res.json(updatedCategory);
        return;
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params['id']);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        yield category.deleteOne();
        res.json({ message: 'Deleted Category' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map