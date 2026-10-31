package com.incubyte.salary.service;

import com.incubyte.salary.model.Employee;
import com.incubyte.salary.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Page<Employee> getEmployees(String search, String department, String country, Pageable pageable) {
        return employeeRepository.findByFilters(search, department, country, pageable);
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Transactional
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = getEmployeeById(id);
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setCountry(employeeDetails.getCountry());
        employee.setBaseSalary(employeeDetails.getBaseSalary());
        employee.setBonus(employeeDetails.getBonus());
        employee.setCurrency(employeeDetails.getCurrency());
        employee.setEffectiveDate(employeeDetails.getEffectiveDate());
        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }

    public List<Map<String, Object>> getDepartmentAnalytics() {
        return employeeRepository.getDepartmentAnalytics();
    }

    public List<Map<String, Object>> getCountryAnalytics() {
        return employeeRepository.getCountryAnalytics();
    }

    public BigDecimal getTotalPayroll() {
        BigDecimal total = employeeRepository.getTotalPayroll();
        return total != null ? total : BigDecimal.ZERO;
    }

    @Transactional
    public void seed10kEmployees() {
        if (employeeRepository.count() > 0) {
            return;
        }

        String[] firstNames = {"James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"};
        String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White"};
        String[] departments = {"Engineering", "Product", "HR", "Sales", "Marketing", "Finance", "Legal", "Operations"};
        String[] countries = {"USA", "UK", "Germany", "India", "Canada", "Australia", "Singapore", "Japan"};
        String[] currencies = {"USD", "GBP", "EUR", "INR", "CAD", "AUD", "SGD", "JPY"};

        Random random = new Random();
        List<Employee> batch = new java.util.ArrayList<>();

        for (int i = 1; i <= 10000; i++) {
            String firstName = firstNames[random.nextInt(firstNames.length)];
            String lastName = lastNames[random.nextInt(lastNames.length)];
            String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + i + "@acme.org";
            String department = departments[random.nextInt(departments.length)];
            String country = countries[random.nextInt(countries.length)];
            String currency = currencies[random.nextInt(currencies.length)];
            BigDecimal baseSalary = BigDecimal.valueOf(50000 + random.nextInt(150000));
            BigDecimal bonus = BigDecimal.valueOf(random.nextInt(25000));
            LocalDate effectiveDate = LocalDate.now().minusDays(random.nextInt(730));

            batch.add(new Employee(firstName, lastName, email, department, country, baseSalary, bonus, currency, effectiveDate));

            if (batch.size() == 500) {
                employeeRepository.saveAll(batch);
                batch.clear();
            }
        }
        if (!batch.isEmpty()) {
            employeeRepository.saveAll(batch);
        }
    }
}
