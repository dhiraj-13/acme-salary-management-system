package com.incubyte.salary.service;

import com.incubyte.salary.model.Employee;
import com.incubyte.salary.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetEmployeeById_Found() {
        Employee employee = new Employee("John", "Doe", "john.doe@acme.org", "Engineering", "USA", BigDecimal.valueOf(100000), BigDecimal.valueOf(10000), "USD", LocalDate.now());
        employee.setId(1L);

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        Employee found = employeeService.getEmployeeById(1L);
        assertNotNull(found);
        assertEquals("John", found.getFirstName());
        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateEmployee() {
        Employee employee = new Employee("Jane", "Doe", "jane.doe@acme.org", "Product", "UK", BigDecimal.valueOf(120000), BigDecimal.valueOf(15000), "GBP", LocalDate.now());
        
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        Employee created = employeeService.createEmployee(employee);
        assertNotNull(created);
        assertEquals("Jane", created.getFirstName());
        verify(employeeRepository, times(1)).save(employee);
    }
}
