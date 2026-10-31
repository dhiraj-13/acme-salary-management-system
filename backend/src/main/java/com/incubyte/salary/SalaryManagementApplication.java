package com.incubyte.salary;

import com.incubyte.salary.service.EmployeeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SalaryManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalaryManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(EmployeeService employeeService) {
        return args -> {
            employeeService.seed10kEmployees();
        };
    }
}
