# Clave Cosmica API

A simple Node.js API for saving payment information using Express and Mongoose.

## Features

- Save payment data with email, name, paymentKey, and createdDate
- MVC architecture
- MongoDB integration with Mongoose
- CORS enabled
- Input validation
- Error handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system (default: mongodb://localhost:27017)

3. Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

## API Endpoints

### POST /api/payments

Save a new payment.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "paymentKey": "unique-payment-key-123",
  "createdDate": "2023-09-19T10:30:00.000Z" // Optional, defaults to current date
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Payment saved successfully",
  "data": {
    "_id": "650f1234567890abcdef1234",
    "email": "user@example.com",
    "name": "John Doe",
    "paymentKey": "unique-payment-key-123",
    "createdDate": "2023-09-19T10:30:00.000Z",
    "createdAt": "2023-09-19T10:30:00.000Z",
    "updatedAt": "2023-09-19T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email, name, and paymentKey are required fields"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-09-19T10:30:00.000Z"
}
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/clave-cosmica)

## Project Structure

```
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── config/
│   └── database.js        # MongoDB connection
├── controllers/
│   └── paymentController.js # Payment business logic
├── models/
│   └── Payment.js         # Payment Mongoose schema
└── routes/
    └── paymentRoutes.js   # Payment routes
```

## Testing the API

You can test the API using curl:

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "paymentKey": "test-payment-123"
  }'
```
