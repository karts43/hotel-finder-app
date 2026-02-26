# 🏨 Hotel Finder App

A hospitality-focused React application built as part of the Otelier Frontend Coding Assignment.

This application allows users to authenticate, search hotels using Amadeus APIs, compare selected hotels, and visualize pricing data using charts.

---

## 🚀 Live Demo

🔗 Production URL:  
https://hotel-finder-app-nine.vercel.app/

🔗 GitHub Repository:  
https://github.com/karts43/hotel-finder-app

---

## 🛠 Tech Stack

- **Frontend:** React 18 (Hooks)
- **Authentication:** Supabase
- **API Integration:** Amadeus API (via Vercel Serverless Functions)
- **Charts:** Recharts
- **UI Library:** Material UI (MUI)
- **State Management:** Context API
- **Deployment:** Vercel

---

## ✨ Features

- User Signup / Login using Supabase
- Protected Dashboard Route
- Hotel Search with Filters:
  - City Code
  - Check-in Date
  - Check-out Date
  - Number of Guests
- Pagination using "Load More"
- Select & Compare Multiple Hotels
- Comparison Charts (Price Visualization)
- Persistent Selections via Local Storage
- Responsive UI with Material UI
- Secure API Keys via Serverless Backend

---

## 🧠 Architecture Overview

Frontend (React SPA)
↓  
Vercel Serverless API (`/api/hotels`)
↓  
Amadeus API

- API keys are securely handled in serverless functions.
- No sensitive credentials are exposed to the client.
- Auth state persists via Supabase session storage.

---

## 📦 Project Structure

```

hospitality-app/
│
├── src/
│   ├── api/               # Vercel serverless function
│   ├── components/        # Reusable UI components
│   ├── context/           # Auth & Hotel Context
│   ├── pages/             # Home, Login, Signup, Dashboard
│   ├── services/          # API service layer
│   └── main.jsx
│
├── public/
├── vercel.json
├── package.json
└── README.md

````

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/karts43/hotel-finder-app.git
cd hotel-finder-app
````

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret
```

⚠️ Note:

* Amadeus keys are used inside the serverless API.
* On Vercel, these are configured under Project → Settings → Environment Variables.

---

### 4️⃣ Run Locally

For frontend only:

```bash
npm run dev
```

For full local simulation of serverless functions:

```bash
vercel dev
```

Then open:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

* Users sign up / log in using Supabase.
* JWT session is stored by Supabase.
* Protected routes redirect unauthenticated users.
* Auth state is restored on refresh.

---

## 📊 Hotel Comparison Logic

* Users can select multiple hotels.
* Selected hotels are stored in Context + LocalStorage.
* Comparison chart visualizes hotel pricing.
* "Load More" implements client-side pagination.

---

## ⚙️ Assumptions

* Amadeus Test Environment is used.
* Hotel ratings may not be available in selected endpoint.
* API response structure is based on Amadeus hotel-offers endpoint.
* Backend logic is implemented as Vercel serverless function.

---

## 📈 Improvements (Future Scope)

* Infinite Scroll instead of Load More
* Role-based UI (Admin filters)
* Hotel images integration
* Better price breakdown (per night calculation)
* Caching optimization

---

## 🎯 Evaluation Focus Areas Covered

✔ Authentication
✔ Secure API integration
✔ Filters & Pagination
✔ Comparison chart
✔ Deployment
✔ Clean architecture
✔ Error handling
✔ UI polish

---

## 👨‍💻 Author

Kartik Shinde

