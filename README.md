# YouQuote Frontend

**YouQuote Frontend** is the React-based frontend for the [**YouQuote API**](https://github.com/Nizarberyan/youquote-api) project. It allows users to view quotes and authors while providing admin-specific tools for managing quotes, authors, and users.

The application is built using **React**, **TypeScript**, and **Vite**, with **Axios** for API requests. Authentication is handled through JWT tokens stored in `localStorage`.

---

## **Features**

### **1. Quotes and Authors (General Users)**

- **Quotes**:
  - Browse a collection of motivational quotes.
  - View specific quotes by their details.
- **Authors**:
  - Browse all available authors.
  - View all quotes by a specific author.

---

### **2. Admin Dashboard**

- **Overview**: 
  - Displays statistics, including users, active quotes, deleted quotes, and verified users.
  
- **User Management**: 
  - View and manage user information.
  - Edit user roles (e.g., `admin` vs. `user`).
  - Delete users from the system.

- **Quote Management**:
  - Manage active quotes:
    - Publish or delete active quotes.
  - Manage deleted quotes:
    - Restore deleted quotes.
    - Permanently delete quotes.

---

## **Routes**

### Public Routes:
| Route             | Functionality                                                   |
|--------------------|----------------------------------------------------------------|
| `/`               | Home page                                                      |
| `/register`       | User registration page                                         |
| `/login`          | User login page                                                |
| `/quotes`         | Browse all quotes                                              |
| `/quotes/:quoteId`| View a specific quote                                          |
| `/authors`        | List all authors                                               |
| `/authors/:authorId` | View all quotes by a specific author                         |

### Admin Routes (Requires Authentication):
| Route             | Functionality                                                   |
|--------------------|----------------------------------------------------------------|
| `/dashboard`      | Admin dashboard for managing quotes, authors, and users        |

---

## **Getting Started**

### **1. Prerequisites**
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### **2. Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/youquote-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd youquote-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

### **3. Environment Variables**

Create a `.env` file in the root of the project and configure the following variables as per your backend setup: