# Salary Management System

## Tech Stack & Versions
- **Backend:** Java 17, Spring Boot 3.2.5
- **Frontend:** Angular 17, TypeScript 5.2, Bootstrap 5.3
- **Database:** H2 (In-memory Relational Database)

## Running Instructions

### Backend (Spring Boot)
1. Open a terminal and navigate to the backend directory:
   `cd salary-management-system/backend`
2. Run using Maven:
   - On Windows: `mvnw.cmd spring-boot:run`
   - On Mac/Linux: `./mvnw spring-boot:run`
3. The backend server will start on `http://localhost:8080` and automatically seed employees into the relational H2 database on startup.

### Frontend (Angular)
1. Open a new terminal and navigate to the frontend directory:
   `cd salary-management-system/frontend`
2. Install dependencies (if needed):
   `npm install`
3. Run the development server:
   `npm start` (Runs on `http://localhost:4200`)
4. Run tests with code coverage:
   `npx ng test --watch=false --code-coverage`
