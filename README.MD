# SkyScape 🏙️

SkyScape is a **full-stack web application** for listing, reviewing, and managing properties or items for rent or sale. It provides a seamless experience for users to create, update, and explore listings while also allowing reviews and ratings for each listing. The application features user authentication, flash messages, validation, and a clean, responsive UI.

---

## Features ✨

- **User Authentication**:
  - Secure sign-up and login using Passport.js.
  - Flash messages for success or error feedback.
  - Redirect users to their intended page after login.

- **Listings Management**:
  - Create, update, delete, and view detailed listings.
  - Add property details such as title, description, price, and location.
  - Image upload functionality with resizing.

- **Reviews and Ratings**:
  - Add reviews with ratings for listings.
  - Edit or delete reviews by the author.

- **Form Validation**:
  - Robust server-side validation using Joi.
  - Middleware to validate data before database operations.

- **Responsive Design**:
  - Clean and modern UI using **Bootstrap 5** and custom CSS.

- **Security**:
  - MongoDB sessions with secure cookies.
  - Input validation to prevent malformed requests.

---

## Tech Stack 🛠️

### Backend:
- **Node.js**: Runtime for building the server.
- **Express.js**: Framework for routing and middleware.
- **MongoDB**: NoSQL database for storing users, listings, and reviews.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **Passport.js**: Authentication middleware.
- **Joi**: Validation for form data.
- **Multer**: Middleware for handling image uploads.
- **Cloudinary**: Image storage and optimization (via custom configuration).

### Frontend:
- **EJS**: Template engine for server-side rendering.
- **Bootstrap**: For responsive design and layout.
- **FontAwesome**: For icons.
- **Custom CSS**: Styling for the application.

---

## Installation and Setup 🖥️

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- Cloudinary account for storing images.

### Steps to Run Locally

1. **Clone the repository**:
https://github.com/pranavshan/SkyScape.git

2. **Install dependencies**:

npm install

3. **Setup Environment Variables**: 
Create a .env file in the root directory and add the following:

dbUrl=<Your MongoDB Connection String>
secret=<Your Session Secret>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>

4. **Start MongoDB**:
mongod

5. **Run the Application**:

npm start


Open your browser and go to: http://localhost:8080

# Deployment 🌐
Steps for Deployment
1. Host MongoDB:
Use MongoDB Atlas for a cloud-based database.
2. Deploy the Backend:
Use a platform like Render or Heroku to host your backend.
3. Configure Cloudinary:
Store images on Cloudinary using the credentials in your .env file.

# RENDER LIVE LINK:
https://connectnow-frontend-4y64.onrender.com