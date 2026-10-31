# Requirements Document: ACME Org Salary Management System

## 1. Goal
Build a robust, fully functional, web-based employee salary management software for ACME Org (10,000 employees across multiple countries) to replace tedious Excel-based tracking. The system empowers HR Managers to efficiently manage salary data, perform bulk operations, and instantly answer analytical questions regarding compensation structure, geographic distribution, and department-wise payroll allocation.

## 2. Scope & Features
- **Employee & Salary Management**: View, search, filter, add, edit, and delete employee salary records (Name, Email, Department, Country, Base Salary, Bonus, Currency, Effective Date).
- **Analytics & Reporting Dashboard**:
  - Total payroll expenditure across departments and countries.
  - Average salary breakdown by department, country, and gender/role (if applicable).
  - High/Low earners and salary distribution histograms.
- **Seeding & Performance**: Initial database seed script containing 10,000 realistic employee records with optimized indexing for fast search, pagination, and aggregation queries.
- **RESTful API Backend**: Spring Boot REST API backed by an SQLite/H2 relational database.
- **Modern Web UI**: Angular/AngularJS responsive interface with component architecture, data tables, search/filter controls, and interactive charts.

## 3. Deliberate Out-of-Scope & Reasoning
- **Multi-country Tax Engine & Payroll Processing (Disbursements)**: Full statutory tax calculation (PAYE, social security, benefits deductions) and bank salary disbursement integrations are excluded because the primary persona (HR Manager) requires salary structuring, budgeting analytics, and record maintenance rather than running actual banking ACH/wire transfers in this phase.
- **Complex Role-Based Access Control (RBAC)**: Multi-tier approvals (e.g., Finance Director sign-off on raises) are deferred to focus on core HR CRUD and analytics performance for 10,000 records.
- **Real-time WebSockets**: Polling/REST is sufficient for enterprise HR CRUD operations at this scale.

## 4. Architecture & Technology Stack
- **Backend**: Java 17 + Spring Boot, Spring Data JPA, SQLite / H2 Database.
- **Frontend**: Angular 17 / TypeScript / Tailwind CSS or Angular Material for responsive dashboard tables and charts.
- **Testing**: JUnit 5 & Mockito for backend unit/integration tests; Jasmine/Karma or Jest for frontend testing.
