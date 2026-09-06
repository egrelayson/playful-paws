# 🐾 PlayfulPaws - Pet Toy & Accessory Store (MVP)

A lightweight, reactive e-commerce web application for pet toys and accessories built with **ReactJS** (JavaScript) and **React-Bootstrap**. The app integrates with a mock REST backend (`json-server`) for dynamic product search and global state management for a seamless cart experience.

---

## ⚡ Features

* **Dynamic Product Catalog**: Fetches and displays products dynamically from `json-server`.
* **Real-time Product Search**: Instant filtering of products by query terms directly from the navigation bar.
* **Reactive Shopping Cart**: Global cart state managed via React Context (`CartContext.jsx`).
* **Slide-out Cart Drawer**: Reactive `OffcanvasCart` displaying current cart items, dynamic quantity adjustment, and real-time subtotal calculation.
* **Responsive UI**: Clean, mobile-friendly interface styled with React-Bootstrap layout components.

---

## 🛠️ Tech Stack

* **Frontend**: ReactJS, React-Bootstrap, Bootstrap 5, Axios
* **State Management**: React Context API (`useContext`)
* **Backend Mock API**: `json-server`
* **Icons**: React Icons / Standard Emojis

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── NavigationBar.jsx       # Top navbar with search input and cart badge
│   │   ├── Footer.jsx              # Application footer
│   │   └── OffcanvasCart.jsx       # Slide-out shopping cart drawer
│   └── products/
│       ├── ProductGrid.jsx         # Responsive grid container for products
│       └── ProductCard.jsx         # Product display card with "Add to Cart" action
├── context/
│   └── CartContext.jsx             # Global state provider for shopping cart management
├── services/
│   └── api.js                      # Axios instance and fetch helpers for json-server
└── App.jsx                         # Main layout connecting state and components