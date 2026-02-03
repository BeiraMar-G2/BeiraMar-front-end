# BeiraMar Front-End

## Overview

BeiraMar Front-End is a **production-ready web application** built as the user interface of the BeiraMar platform. It was developed using modern front-end technologies and follows real-world architectural practices such as component reuse, role-based rendering, API integration, and automated deployment.

This project has **evolved over time**: parts of the codebase were refactored to improve readability, scalability, and maintainability, reflecting a professional development workflow rather than a static academic delivery.

---

## Key Highlights

* Modern React application using **Vite**
* Role-based UI rendering (Admin vs Standard users)
* Integration with an external **RESTful backend API** (separate repository)
* Google OAuth authentication with JWT handling
* Automated **CI/CD pipeline** for build and deployment
* Data visualization dashboards

---

## Tech Stack

* **React 19**
* **Vite**
* **JavaScript (ES6+)**
* **React Router DOM** (SPA navigation)
* **Axios** (API communication)
* **Google OAuth** (`@react-oauth/google`)
* **JWT Decode** (authentication handling)
* **Chart.js / react-chartjs-2** (data visualization)
* **CSS3** (modular styles)
* **ESLint** (code quality)

---

## Architecture Overview

The application follows a modular front-end architecture:

* **Components**: Reusable UI components (buttons, headers, typography)
* **Pages / Menus**: Route-based screens using React Router
* **Services**: Centralized API communication layer
* **Auth Handling**: Client-side JWT decoding and role-based access

The backend API is maintained in a **separate repository**, following a clear separation of concerns between front-end and back-end layers.

---

## Features

* Single Page Application (SPA)
* Centralized navigation using React Router
* Conditional rendering based on user role (Administrator / User)
* Secure authentication flow with Google OAuth
* Dynamic dashboards and charts
* Scalable menu system with reusable components

---

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Application pages and menus
├── services/        # API and authentication services
├── styles/          # Global and component styles
├── App.jsx          # Application root
└── main.jsx         # Entry point
```

---

## CI/CD & Deployment

This project includes an **automated CI/CD pipeline**:

* Continuous build and validation on every push
* Production-ready build using Vite
* Automatic deployment to a hosting platform

This setup ensures fast feedback, reliability, and consistent delivery.

---

## Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

```bash
git clone https://github.com/BeiraMar-G2/BeiraMar-front-end.git
cd BeiraMar-front-end
npm install
```

### Running Locally

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Backend Integration

This front-end consumes a RESTful API exposed by the BeiraMar backend service.

Example endpoints:

```http
POST   /auth/login
GET    /users
GET    /dashboards/summary
```

---

## Code Quality & Evolution

This repository reflects an **iterative development process**. Refactors and improvements were applied after the initial implementation to:

* Reduce duplication
* Improve readability
* Apply modern React and JavaScript best practices

This mirrors how production applications evolve in real-world teams.

---

## Possible Improvement

Some enhancements could further improve this project:

- Refactoring complex business logic into dedicated utility or service files to improve maintainability
- Expanding visual feedback and user experience in specific flows (core components already implemented)
- Enhancing the CI/CD pipeline and infrastructure setup for a long-term, production-grade environment

---

## License

MIT License
