# Water Delivery Service App

A web application for ordering water dispensers and bottles with delivery service.

## Features

- Interactive map for delivery location selection using Google Maps
- Order form for water bottles and dispensers with quantity selection
- Dynamic pricing based on product selection
- Admin settings to configure water bottle types and prices
- Mobile responsive design for all devices

## Technologies

- React.js
- Tailwind CSS for styling
- Google Maps API for location services
- Local storage for settings persistence

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the required environment variables
4. Run the development server with `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_PUBLIC_APP_ID=
VITE_PUBLIC_APP_ENV=
VITE_PUBLIC_SENTRY_DSN=
VITE_PUBLIC_UMAMI_WEBSITE_ID=
VITE_PUBLIC_GOOGLE_MAPS_API_KEY=
```

## Build

To build the app for production, run:

```
npm run build
```

## Deployment

This app is configured for deployment on Vercel.