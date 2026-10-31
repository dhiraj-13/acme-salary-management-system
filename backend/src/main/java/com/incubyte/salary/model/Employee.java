package com.incubyte.salary.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees", indexes = {
    @Index(name = "idx_department", columnList = "department"),
    @Index(name = "idx_country", columnList = "country"),
    @Index(name = "idx_email", columnList = "email")
})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is mandatory")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Department is mandatory")
    @Column(nullable = false)
    private String department;

    @NotBlank(message = "Country is mandatory")
    @Column(nullable = false)
    private String country;

    @NotNull(message = "Base salary is mandatory")
    @DecimalMin(value = "0.0", inclusive = false, message = "Base salary must be greater than zero")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal baseSalary;

    @NotNull(message = "Bonus is mandatory")
    @DecimalMin(value = "0.0", message = "Bonus cannot be negative")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal bonus;

    @NotBlank(message = "Currency is mandatory")
    @Column(nullable = false, length = 3)
    private String currency;

    @NotNull(message = "Effective date is mandatory")
    @Column(nullable = false)
    private LocalDate effectiveDate;

    public Employee() {}

    public Employee(String firstName, String lastName, String email, String department, String country, BigDecimal baseSalary, BigDecimal bonus, String currency, LocalDate effectiveDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.country = country;
        this.baseSalary = baseSalary;
        this.bonus = bonus;
        this.currency = currency;
        this.effectiveDate = effectiveDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public BigDecimal getBaseSalary() { return baseSalary; }
    public void setBaseSalary(BigDecimal baseSalary) { this.baseSalary = baseSalary; }

    public BigDecimal getBonus() { return bonus; }
    public void setBonus(BigDecimal bonus) { this.bonus = bonus; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public LocalDate getEffectiveDate() { return effectiveDate; }
    public void setEffectiveDate(LocalDate effectiveDate) { this.effectiveDate = effectiveDate; }
}
