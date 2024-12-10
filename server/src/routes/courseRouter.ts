import express, { Request, Response } from 'express';
import { scrapeAndStoreCourses } from '../controllers/coursesController';

const router = express.Router();

// Route to scrape and store courses
router.get('/scrape', async (req: Request, res: Response) => {
    try {
        await scrapeAndStoreCourses(req, res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping courses.' });
    }
});

export default router;
