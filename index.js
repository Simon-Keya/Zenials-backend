"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const env_1 = require("./src/config/env");
const badgeRoutes_1 = __importDefault(require("./src/routes/badgeRoutes"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const uploadRoutes_1 = __importDefault(require("./src/routes/uploadRoutes"));
const app = (0, express_1.default)();
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: true }));
// Routes
app.use('/api/badges', badgeRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/uploads', uploadRoutes_1.default);
app.listen(env_1.config.port, () => {
    console.log(`Server is running on port ${env_1.config.port}`);
});
exports.default = app;
