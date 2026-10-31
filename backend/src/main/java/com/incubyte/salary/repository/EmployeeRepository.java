package com.incubyte.salary.repository;

import com.incubyte.salary.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "(:search IS NULL OR LOWER(e.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:department IS NULL OR e.department = :department) AND " +
           "(:country IS NULL OR e.country = :country)")
    Page<Employee> findByFilters(@Param("search") String search,
                                 @Param("department") String department,
                                 @Param("country") String country,
                                 Pageable pageable);

    @Query("SELECT e.department as department, SUM(e.baseSalary + e.bonus) as totalPayroll, AVG(e.baseSalary) as avgSalary, COUNT(e) as employeeCount FROM Employee e GROUP BY e.department")
    List<Map<String, Object>> getDepartmentAnalytics();

    @Query("SELECT e.country as country, SUM(e.baseSalary + e.bonus) as totalPayroll, AVG(e.baseSalary) as avgSalary, COUNT(e) as employeeCount FROM Employee e GROUP BY e.country")
    List<Map<String, Object>> getCountryAnalytics();

    @Query("SELECT SUM(e.baseSalary + e.bonus) FROM Employee e")
    BigDecimal getTotalPayroll();
}
