# Architecture & Submission Notes: ACME Org Salary Management System

## 1. System Architecture
- **Backend**: Spring Boot REST API using Java 17, Spring Data JPA, and H2 (in-memory relational database). Designed with a clean three-tier architecture (Controller, Service, Repository) to ensure separation of concerns and maintainability.
- **Frontend**: Responsive Single Page Application built with Bootstrap and modular UI components, communicating via RESTful JSON endpoints with pagination and filtering.
- **Data Seeding**: Automated high-performance startup runner that seeds 10,000 realistic employee records with department, country, currency, base salary, and bonus distributions.

## 2. Key Engineering Decisions & Trade-offs
- **In-Memory H2 Database vs. SQLite/PostgreSQL**: Chosen for zero-friction local execution and testing readiness, while JPA/Hibernate ORM abstracts the underlying database engine, allowing seamless switching to persistent databases like PostgreSQL or MySQL in production.
- **Server-Side Pagination & Filtering**: To handle 10,000+ employees efficiently without overloading the browser memory or network, search, department/country filters, and pagination are executed at the database query level using Spring Data Pageable.
- **Analytics Aggregations**: Database-level GROUP BY queries are used to calculate departmental and country-wide payroll totals and averages, minimizing memory footprint and network payload size.

## 3. AI Workflow & Collaboration
- **Prompt Engineering**: Used AI agents to generate structured domain models, optimized repository query builders, and responsive layout templates.
- **Incremental Refinement**: Built backend and frontend components iteratively with rigorous test coverage for core business logic and REST endpoints.
