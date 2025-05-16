# Fivestar Payments Engine Frontend

This project contains the frontend implementation of the Fivestar Payments Engine. It is built with React, TypeScript, and Tailwind CSS, using Vite as the build tool.

## Overview

The Fivestar Payments Engine is a critical component that handles loan repayments through various channels including cash collections, digital payments, UPI AutoPay, and NACH mandates. This modern frontend implementation provides a user-friendly interface for monitoring and managing payment transactions, especially during LMS downtime scenarios.

## Features

- **Authentication Module**: Secure login with two-factor authentication
- **Digital Payments Integration**: Manage and monitor payments through RazorPay, QR, and BBPS channels
- **LMS Downtime Handling**: Resilient transaction processing during LMS unavailability
- **Transaction Queue Manager**: Monitor and manage transactions with retry capabilities
- **Mandate Management**: Register and manage UPI AutoPay and NACH mandates for loan repayments
- **Comprehensive Reports**: Detailed reporting capabilities for all payment channels with visualizations
- **Responsive Design**: Compatible with desktop and mobile devices

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd paymentengine

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│   └── layouts/     # Layout components (DashboardLayout)
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── DigitalPaymentsIntegration.tsx
│   ├── LMSDowntimeResiliency.tsx
│   ├── Login.tsx
│   ├── MandateManagement.tsx
│   ├── MultiFactorAuth.tsx
│   ├── Reports.tsx
│   └── TransactionQueueManager.tsx
├── App.tsx          # Main application component with routing
└── main.tsx         # Entry point
```

## Core Technologies

- **React**: Frontend library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next-generation frontend build tool
- **React Router**: Routing library for React
- **Lucide React**: Icon library
- **Recharts**: Composable charting library for data visualizations

## Development

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Design Guidelines

This project follows the Fivestar design guidelines, using:

- **Primary Colors**: Deep Blue (#003366), Gold (#FFC107)
- **UI Components**: Standardized UI components for consistency
- **Responsive Design**: Mobile-first approach for optimal viewing on all devices

## License

This project is proprietary and confidential. Unauthorized copying or distribution of this project is strictly prohibited.

© 2025 Fivestar Business Finance Limited. All rights reserved.
