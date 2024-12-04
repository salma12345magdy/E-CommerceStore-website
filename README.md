# **E-Commerce Store Project **  
---
Mean stack web development project, as an application on Mean stack course
## **Table of Contents**
- About the Project  
- Features  
- Technologies Used  
- Installation  
- Usage  
- Folder Structure  
- Future Improvements  

---

## **About the Project**  
The E-Commerce Store is a web application designed to provide users with an interactive and user-friendly shopping experience. It allows users to browse products, view details, and manage their preferences, while administrators can oversee and manage the store's inventory.  

---

## **Features**  
- Homepage showcasing featured and new arrival products.  
- Product Search functionality for users to find items easily.  
- User Registration and Login for personalized features.  
- Admin Dashboard for managing:  
  - Products  
  - Categories  
  - Users  
  - Orders  
- Secure Authentication and Authorization using JWT.  
- Favorites and Wishlist Management for users.  
- Responsive Design for mobile and desktop compatibility.  

---

## **Technologies Used**  
- **Frontend**: Angular  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Other Tools**:  
  - JWT for secure authentication.  
  - CSS for styling.  

---

## **Installation**  
To run this project locally, follow these steps:  

### Clone the Repository  
```bash
git clone https://github.com/SalmaMagdy/E-Commerce-Store.git  
cd E-Commerce-Store
#### Install backend dependencies
cd backend  
npm install  

#### Install frontend dependencies
cd ../my-app  
npm install

###Start the Application

####Backend:
cd backend  
npm start  
####Frontend:
cd my-app  
ng serve
Open your browser and navigate to http://localhost:4200.

--
## **Folder Structure:**

E-Commerce-Store/  
│  
├── backend/  
│   ├── controllers/       # Logic for handling requests  
│   ├── models/            # MongoDB schemas for data  
│   ├── routers/           # Routes for APIs  
│   ├── middleware/        # Authentication and authorization logic  
│   └── app.js             # Main backend entry point  
│  
├── my-app/  
│   ├── src/  
│   │   ├── app/  
│   │   │   ├── components/   # Components for each page and feature  
│   │   │   ├── services/     # Angular services for API calls  
│   │   │   └── guards/       # Route guards for authentication  
│   │   └── environments/     # Environment configuration  
│   └── angular.json          # Angular configuration  
│  
└── README.md  
--
## **Futer Improvement:**
- Integrate a checkout page and payment gateway.
- Add advanced analytics for admin insights.
- Implement multi-language support for global accessibility.
- Enhance user profile functionality to include order history and settings.
--

Contact If you have any questions, feel free to reach out:
Salma GitHub Profile Email:
salma.magdy.200295@gmail.com
