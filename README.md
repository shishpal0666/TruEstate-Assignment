# TruEstate - SDE Intern Assignment

## Brief Overview
This TruEstate - Assignment have all-in-one Sales Management Dashboard that visualizes transactions, filters out cases, and gives sales metrics. It runs on a responsive UI that dynamically handles data. Get the live application here: **[TruEstate Live Demo](https://truestate-shishpal-assignment.vercel.app/)**.

## Tech Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)

## Search Implementation Summary
Using MongoDB's `$text` index on `customer.name` and partial matching on `customer.phone_normalized`. The search query (`q`) triggers a text search against these indexed fields to return relevant transactions.

## Filter Implementation Summary
Filtering is done server-side through query parameters. 
- Exact match on: `regions`, `genders`, `productCategories`, `paymentMethods`, and `tags` (using `$in`).
- Range queries on: `age` (min/max) and `date` (from/to) using `$gte`/`$lte`.
- Metadata is dynamic, with the frontend fetching present filter options (like available tags) from the backend to populate UI dropdowns dynamically.

## Sort Implementation Summary
Sorting is handled by the `buildSort` service.
- Sorting by Date (Newest/Oldest), Quantity (High/Low), and Customer Name (A-Z).
- Default sorting by Date (descending).

## Pagination Implementation Summary
Efficient offset-based pagination.
- **Logic**: Receives `page` and `pageSize` parameters, calculating `skip = (page - 1) * pageSize`.
- **Response**: Returns data paginated with meta-log (total items, total pages, current page) for navigation state in the front end.

## Setup Instructions

### 1. Installation
Clone the repository and install dependencies for both frontend and backend:
```bash
git clone https://github.com/shishpal0666/TruEstate-Assignment.git
cd TruEstate-Assignment/Backend && npm install
cd ../Frontend && npm install
```

### 2. Environment Variables
Create a `.env` file in the `Backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Run Application
Run backend and frontend servers:
```bash
# Backend
npm run dev
# Frontend
npm run dev
```

### 4. Default Credentials
Use these pre-filled credentials to log in:
- **Email**: `admin@example.com`
- **Password**: `Admin@123`
