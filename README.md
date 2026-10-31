# Running instructions

## Backend (Spring Boot)
1. Open a terminal and navigate to the backend directory:
   `cd salary-management-system/backend`
2. Run using Maven:
   - On Windows: `mvnw.cmd spring-boot:run`
   - On Mac/Linux: `./mvnw spring-boot:run`
3. The backend server will start on `http://localhost:8080` and automatically seed 10,000 employees into the in-memory H2 database on startup.

## Frontend (Angular / HTML)
1. Open a new terminal and navigate to the frontend directory:
   `cd salary-management-system/frontend`
2. Install dependencies (if needed):
   `npm install`
3. Run http-server or open directly:
   `npm start` (Runs on `http://localhost:4200`)
   Alternatively, you can open [`index.html`](salary-management-system/frontend/index.html) directly in any browser.
