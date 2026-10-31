/// <reference types="jasmine" />
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from '../services/employee.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpMock: HttpTestingController;
  let employeeService: EmployeeService;

  const mockEmployeesResponse = {
    content: [
      { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', country: 'USA', baseSalary: 100000, bonus: 5000, currency: 'USD' }
    ],
    totalPages: 2,
    totalElements: 11
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule],
      providers: [EmployeeService]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    employeeService = TestBed.inject(EmployeeService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the dashboard component', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 105000 }));
    
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.title).toEqual('salary-management-frontend');
    expect(component.currentView).toEqual('employees');
  });

  it('should load employees and total payroll on init', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 500000 }));

    fixture.detectChanges();

    expect(component.employees.length).toEqual(1);
    expect(component.totalPages).toEqual(2);
    expect(component.totalElements).toEqual(11);
    expect(component.totalPayroll).toEqual(500000);
  });

  it('should handle search input with debounce', fakeAsync(() => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));

    fixture.detectChanges();

    component.onSearchChange('John');
    expect(component.searchQuery).toEqual('John');
    
    tick(300);
    expect(component.currentPage).toEqual(0);
    flush();
  }));

  it('should load analytics', () => {
    const deptData = [{ department: 'Engineering', totalPayroll: 200000 }];
    const countryData = [{ country: 'USA', totalPayroll: 200000 }];

    spyOn(employeeService, 'getDepartmentAnalytics').and.returnValue(of(deptData));
    spyOn(employeeService, 'getCountryAnalytics').and.returnValue(of(countryData));
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));

    component.loadAnalytics();

    expect(component.deptAnalytics).toEqual(deptData);
    expect(component.countryAnalytics).toEqual(countryData);
  });

  it('should change page if within valid range', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));

    fixture.detectChanges();

    component.totalPages = 3;
    component.changePage(1);
    expect(component.currentPage).toEqual(1);

    // Invalid page
    component.changePage(5);
    expect(component.currentPage).toEqual(1);

    component.changePage(-1);
    expect(component.currentPage).toEqual(1);
  });

  it('should reset filters', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));

    component.searchQuery = 'Test';
    component.selectedDepartment = 'HR';
    component.selectedCountry = 'USA';
    component.currentPage = 2;

    component.resetFilters();

    expect(component.searchQuery).toEqual('');
    expect(component.selectedDepartment).toEqual('');
    expect(component.selectedCountry).toEqual('');
    expect(component.currentPage).toEqual(0);
  });

  it('should open add modal with default values', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));

    component.openAddModal();

    expect(component.isEditMode).toBeFalse();
    expect(component.currentEmployee.currency).toEqual('USD');
    expect(component.currentEmployee.effectiveDate).toBeDefined();
  });

  it('should open edit modal with employee data', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));

    const emp = mockEmployeesResponse.content[0];
    component.openEditModal(emp);

    expect(component.isEditMode).toBeTrue();
    expect(component.currentEmployee).toEqual(emp);
  });

  it('should save existing employee (update)', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));
    spyOn(employeeService, 'updateEmployee').and.returnValue(of({}));

    const empData = { id: 1, name: 'John Updated' };
    component.saveEmployee(empData);

    expect(employeeService.updateEmployee).toHaveBeenCalledWith(1, empData);
  });

  it('should save new employee (create)', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));
    spyOn(employeeService, 'createEmployee').and.returnValue(of({}));

    const empData = { name: 'New Employee' };
    component.saveEmployee(empData);

    expect(employeeService.createEmployee).toHaveBeenCalledWith(empData);
  });

  it('should delete employee after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployeesResponse));
    spyOn(employeeService, 'getTotalPayroll').and.returnValue(of({ totalPayroll: 100000 }));
    spyOn(employeeService, 'deleteEmployee').and.returnValue(of({}));

    component.deleteEmployee(1);

    expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
  });

  it('should not delete employee if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(employeeService, 'deleteEmployee').and.returnValue(of({}));

    component.deleteEmployee(1);

    expect(employeeService.deleteEmployee).not.toHaveBeenCalled();
  });

  it('should cancel form', () => {
    // Just verifying method execution without errors
    expect(() => component.cancelForm()).not.toThrow();
  });

  it('should unsubscribe on destroy', () => {
    if (component['searchSubscription']) {
      spyOn(component['searchSubscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(component['searchSubscription'].unsubscribe).toHaveBeenCalled();
    }
  });
});
