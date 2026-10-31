import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, EmployeeFormComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = "salary-management-frontend";
  API_BASE = "http://localhost:8080/api/employees";

  currentView = "employees";
  employees: any[] = [];
  searchQuery = "";
  selectedDepartment = "";
  selectedCountry = "";

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  displayedColumns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Department", field: "department" },
    { label: "Country", field: "country" },
    { label: "Base Salary", field: "baseSalary" },
    { label: "Bonus", field: "bonus" },
    { label: "Currency", field: "currency" },
    { label: "Actions", field: "actions", class: "text-end" },
  ];

  countries = [
    "USA",
    "UK",
    "Germany",
    "India",
    "Canada",
    "Australia",
    "Singapore",
    "Japan",
  ];

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  totalPayroll = 0;
  deptAnalytics: any[] = [];
  countryAnalytics: any[] = [];
  currentEmployee: any = {};
  isEditMode = false;

  private employeeModal: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 0;
        this.loadEmployees();
      });

    this.loadEmployees();
    this.loadTotalPayroll();

    setTimeout(() => {
      const modalEl = document.getElementById("employeeModal");
      if (modalEl && (window as any).bootstrap) {
        this.employeeModal = new (window as any).bootstrap.Modal(modalEl);
      }
    }, 500);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(searchTerm: string) {
    this.searchQuery = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  loadEmployees() {
    let params: any = {
      page: this.currentPage,
      size: this.pageSize,
    };
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.selectedDepartment) params.department = this.selectedDepartment;
    if (this.selectedCountry) params.country = this.selectedCountry;

    this.http.get<any>(this.API_BASE, { params }).subscribe((res) => {
      this.employees = res.content;
      this.totalPages = res.totalPages;
      this.totalElements = res.totalElements;
    });
  }

  loadTotalPayroll() {
    this.http
      .get<any>(this.API_BASE + "/analytics/total-payroll")
      .subscribe((res) => {
        this.totalPayroll = res.totalPayroll;
      });
  }

  loadAnalytics() {
    this.http
      .get<any[]>(this.API_BASE + "/analytics/department")
      .subscribe((res) => {
        this.deptAnalytics = res;
      });
    this.http
      .get<any[]>(this.API_BASE + "/analytics/country")
      .subscribe((res) => {
        this.countryAnalytics = res;
      });
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadEmployees();
    }
  }

  resetFilters() {
    this.searchQuery = "";
    this.selectedDepartment = "";
    this.selectedCountry = "";
    this.currentPage = 0;
    this.loadEmployees();
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentEmployee = {
      currency: "USD",
      effectiveDate: new Date().toISOString().split("T")[0],
    };
    if (this.employeeModal) {
      this.employeeModal.show();
    }
  }

  openEditModal(emp: any) {
    this.isEditMode = true;
    this.currentEmployee = { ...emp };
    if (this.employeeModal) {
      this.employeeModal.show();
    }
  }

  saveEmployee(employeeData: any) {
    // console.log(employeeData);
    if (employeeData.id) {
      this.http
        .put(this.API_BASE + "/" + employeeData.id, employeeData)
        .subscribe(() => {
          if (this.employeeModal) this.employeeModal.hide();
          this.loadEmployees();
          this.loadTotalPayroll();
        });
    } else {
      this.http.post(this.API_BASE, employeeData).subscribe(() => {
        if (this.employeeModal) this.employeeModal.hide();
        this.loadEmployees();
        this.loadTotalPayroll();
      });
    }
  }

  cancelForm() {
    if (this.employeeModal) {
      this.employeeModal.hide();
    }
  }

  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.http.delete(this.API_BASE + "/" + id).subscribe(() => {
        this.loadEmployees();
        this.loadTotalPayroll();
      });
    }
  }
}
