import express from "express";
import Performance from "../models/performanceReview.model.js";
import { createPerformanceReview, getPerformanceReviewsById, getAllPerformanceReviews, updatePerformanceReview, deletePerformanceReview } from "../controller/performanceController.js";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Performance Routes');
})
//Add Performance Review
router.post('/add', async (req, res) => {
    const performance = new Performance({
        employeeId: req.body.employeeId,
        performanceId: req.body.performanceId,
        title: req.body.title,
        description: req.body?.description,
        status: req.body.status,
    });
    try {
        const saved = await createPerformanceReview(performance);
        res.status(201).send(saved);
    } catch (error) {
        res.status(400).send(error);
    }
})

//View all Performance Reviews
router.get('/allPerformanceReviews', async (req, res) => {
    try {
        const performanceReviews = await getAllPerformanceReviews();
        res.status(200).json(performanceReviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

//Get/update/delete performance Review by Id
router.route('/:id')
.get(async (req, res) => {
    const performanceId = req.params.id;
    try {
        const performance = await getPerformanceReviewsById(performanceId); 
        if (!performance) {
            res.status(404).json({ error: "No Performance with this Id Exist" });
        } else {
            res.status(200).json(performance);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
.put(async (req, res) => {
    const performanceId = req.params.id;
    try {
        const updatedPerformance = await updatePerformanceReview(performanceId, req.body);
        res.status(200).json(updatedPerformance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
.delete(async (req, res) => {
    const performanceId = req.params.id;
    try {
        const deletedPerformance = await deletePerformanceReview(performanceId);
        res.status(200).json(deletedPerformance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export default router;