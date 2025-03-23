# Water Delivery Service App

A web application for ordering water dispensers and bottles with delivery service.

## Features

- Interactive map for delivery location selection using Google Maps
- Order form for water bottles and dispensers with quantity selection
- Dynamic pricing based on product selection
- Admin settings to configure water bottle types and prices
- Mobile responsive design for all devices
- User roles: Customer, Deliverer, and Admin
- Payment type selection with tipping options
- Order notifications for nearby deliverers
- Employee management for admin users
- Activity monitoring for administrators

## Technologies

- React.js
- Tailwind CSS for styling
- Google Maps API for location services
- Local storage for data persistence

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the required environment variables
4. Run the development server with `npm run dev`

## User Roles

- **Customer**: Can place orders, view order history, and manage profile
- **Deliverer**: Can receive order notifications, manage deliveries, and update profile
- **Admin**: Can access admin dashboard, manage employees, modify prices, and configure app settings

## Admin Access

The default admin credentials are:
- Username: Admin
- Password: 1593

## Build

To build the app for production, run:

```
npm run build
```

## Deployment

This app is configured for deployment on Vercel.