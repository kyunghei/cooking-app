# 🍳 Egg-cellent Recipe Sharing App
Egg-cellent is a user-friendly recipe sharing platform that allows users to explore, add, and manage delicious recipes.

Hosted on [Heroku](https://cooking-app-demo-35a074f514f1.herokuapp.com/) for a live demo experience.

## 🚀 Features
- **User Registration & Login:** Sign up, log in, and start adding your recipes.
- **Recipe Manaement:** Add, edit, or delete your recipes with ease.
- **Cuisine Filtering:** Find your favorite recipes by filtering through cuisine types.
- **Responsive Design:** Accessible across desktop, tablet, and mobile devices.

## ✨ Demo
Check out the app in action! 🎥
### Homepage
![Home Page](eggcellent-homepage.png)
### Register & Login
### Add Recipe
### Filter by Cuisine

## ⚙️ Technology Stack
- **Frontend:** React.js
- **Backend:** Django & Django REST Framework
- **Datebase:** SQLite
- **Hosting:** Heroku

## 📁 Getting Started
To run this project locally:
### Backend Setup
1. Clone this repository:
   
   ```git clone https://github.com/kyunghei/cooking-app.git```
3. Navigate to the backend directory:
   
   ```cd egg-cellent/backend```
5. Install dependencies:
   
   ```pip install -r requirements.txt```
7. Apply migrations and start the backend server.
   
   ```
   python3 manage.py migrate
   
   python3 manage.py runserver
   ```
### Frontend Setup
1. Open a new terminal wiwndow and navigate to the frontend directory:

   ```cd frontend```
2. Install dependencies:

   ```npm install```
3. Start the frontend development server:
   
   ```npm run start```

Now, the app should be running at ```http://localhost:3000``` (frontend) and ```http://localhost:8000``` (backend).

## 🧑‍🍳 About
Egg-cellent was created as a capstone project to demonstrate full-stack development using Django for the backend and React for the frontend. The app includes user authentication, image uploads, recipe CRUD functionality, and a responsive UI.