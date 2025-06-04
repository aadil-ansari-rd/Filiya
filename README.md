# Filiya 🍽️

**Filiya** is a full-featured restaurant web application developed using the **MERN stack**. It consists of an admin dashboard, user frontend, and backend APIs. The platform supports menu browsing, table booking, order placement, payment via Stripe, and more.

## 🗂️ Project Structure

```
filiya/
├── admin-fly     # Admin panel (React + Vite)
├── api-fly       # Backend (Node.js + Express)
├── user-fly      # User-facing frontend (React + Vite)
```

## 🚀 Features

* Secure User Authentication
* Menu Management
* Table Reservations
* Online Payments (Stripe)
* Admin Dashboard with Control Panel
* Email-based OTP Verification
* Cloudinary Integration for Image Uploads

---

## 🔧 Set Following Environment Variables

### 📁 `admin-fly/.env`

```
VITE_BASE_API=http://localhost:3000
```

---

### 📁 `user-fly/.env`

```
VITE_BASE_API=http://localhost:3000
STRIPE=your_stripe_private_key
```

---

### 📁 `api-fly/.env`

```
MONGOURL=your_mongodb_connection_string

F_SECRETE=ihdbcefkjnmsfu3948476725vf

FROMEMAIL=your_email_address
APP_PASSKEY=your_cloudinary_passkey
APIKEY=your_cloudinary_api_key
APISECRET=your_cloudinary_api_secret

STRIPE=your_stripe_secret_key

ADMIN_IP=http://localhost:3002
USER_IP=http://localhost:3001

PAY_Y=http://localhost:3001/payment/success
PAY_N=http://localhost:3001/payment/failure
```

---

## 📦 Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Payment:** Stripe
* **Media:** Cloudinary

---



---
