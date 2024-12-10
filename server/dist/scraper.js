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
exports.scrapeCourses = scrapeCourses;
exports.storeCourses = storeCourses;
const puppeteer_1 = __importDefault(require("puppeteer"));
const sqlite3_1 = __importDefault(require("sqlite3"));
// Function to scrape courses from YouTube
function scrapeCourses(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        const url = `https://www.youtube.com/results?search_query=${query}`;
        console.log(`Navigating to: ${url}`);
        yield page.goto(url, { waitUntil: "load", timeout: 60000 });
        try {
            yield page.waitForSelector("ytd-video-renderer", { timeout: 10000 });
        }
        catch (error) {
            console.error("No videos found or page took too long to load!");
            yield browser.close();
            return [];
        }
        const courses = yield page.evaluate(() => {
            const courses = [];
            const videoElements = document.querySelectorAll("ytd-video-renderer");
            videoElements.forEach((video) => {
                var _a;
                const titleElement = video.querySelector("#video-title");
                const title = (_a = titleElement === null || titleElement === void 0 ? void 0 : titleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                const link = `https://www.youtube.com${titleElement === null || titleElement === void 0 ? void 0 : titleElement.getAttribute("href")}`;
                if (title && link) {
                    courses.push({ title, link });
                }
            });
            return courses;
        });
        yield browser.close();
        return courses;
    });
}
// Function to store courses in SQLite database
function storeCourses(courses) {
    const db = new sqlite3_1.default.Database("./database.sqlite");
    db.serialize(() => {
        courses.forEach((course) => {
            db.run("INSERT INTO courses (title, link) VALUES (?, ?)", [course.title, course.link], (err) => {
                if (err) {
                    console.error("Error inserting course:", err.message);
                }
            });
        });
    });
    db.close(() => {
        console.log("Courses stored successfully!");
    });
}
