import express from 'express';
const router = express.Router();
import { savePayment, getAllPayments } from '../controllers/paymentController.js';

// GET /api/payments - Get all payments
router.get('/', getAllPayments);

// POST /api/payments - Save a new payment
router.post('/', savePayment);

export default router;
