import Payment from '../models/Payment.js';
import { encryptSensitiveFields, decryptSensitiveFields } from '../utils/crypto.js';

const savePayment = async (req, res) => {
  try {
    const { transaction_id, email, accessCode, amount, currency, status } = req.body;

    if (!transaction_id || !email || !accessCode || !amount) {
      return res.status(400).json({
        success: false,
        message: 'transaction_id, email, accessCode, and amount are required fields'
      });
    }

    const encryptedData = encryptSensitiveFields({
      transaction_id,
      email,
      accessCode,
      amount,
      currency: currency || 'USD',
      status: status || 'pending'
    });

    const payment = new Payment(encryptedData);
    const savedPayment = await payment.save();

    const decryptedResponse = decryptSensitiveFields(savedPayment.toObject());

    res.status(201).json({
      success: true,
      message: 'Payment saved successfully',
      data: decryptedResponse
    });

  } catch (error) {
    console.error('Error saving payment:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Payment with this transaction_id already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 });

    const decryptedPayments = payments.map(payment => 
      decryptSensitiveFields(payment.toObject())
    );

    res.status(200).json({
      success: true,
      message: 'Payments retrieved successfully',
      count: decryptedPayments.length,
      data: decryptedPayments
    });

  } catch (error) {
    console.error('Error retrieving payments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export {
  savePayment,
  getAllPayments
};
