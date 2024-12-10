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
exports.connectDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, sqlite_1.open)({
            filename: "./database.sqlite", // Corrected database file name
            driver: sqlite3_1.default.Database, // SQLite driver
        });
        console.log("Database connection established.");
        return db;
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
});
exports.connectDB = connectDB;
