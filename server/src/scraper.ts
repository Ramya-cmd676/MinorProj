import puppeteer from 'puppeteer';
import sqlite3 from "sqlite3";

// Function to scrape courses from YouTube
export async function scrapeCourses(query: string): Promise<{ title: string; link: string }[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://www.youtube.com/results?search_query=${query}`;

    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: "load", timeout: 60000 });

    try {
        await page.waitForSelector("ytd-video-renderer", { timeout: 10000 });
    } catch (error) {
        console.error("No videos found or page took too long to load!");
        await browser.close();
        return [];
    }

    const courses = await page.evaluate(() => {
        const courses: { title: string; link: string }[] = [];
        const videoElements = document.querySelectorAll("ytd-video-renderer");
        videoElements.forEach((video) => {
            const titleElement = video.querySelector("#video-title");
            const title = titleElement?.textContent?.trim();
            const link = `https://www.youtube.com${titleElement?.getAttribute("href")}`;
            if (title && link) {
                courses.push({ title, link });
            }
        });
        return courses;
    });

    await browser.close();
    return courses;
}

// Function to store courses in SQLite database
export function storeCourses(courses: { title: string; link: string }[]): void {
    const db = new sqlite3.Database("./database.sqlite");


    db.serialize(() => {
        courses.forEach((course) => {
            db.run(
                "INSERT INTO courses (title, link) VALUES (?, ?)",
                [course.title, course.link],
                (err) => {
                    if (err) {
                        console.error("Error inserting course:", err.message);
                    }
                }
            );
        });
    });

    db.close(() => {
        console.log("Courses stored successfully!");
    });
}
