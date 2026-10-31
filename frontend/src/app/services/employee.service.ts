import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_BASE = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(paramsObj: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (paramsObj[key] !== null && paramsObj[key] !== undefined && paramsObj[key] !== '') {
        params = params.set(key, paramsObj[key]);
      }
    });
    return this.http.get<any>(this.API_BASE, { params });
  }

  getTotalPayroll(): Observable<any> {
    return this.http.get<any>(this.API_BASE + '/analytics/total-payroll');
  }

  getDepartmentAnalytics(): Observable<any[]> {
    return this.http.get<any[]>(this.API_BASE + '/analytics/department');
  }

  getCountryAnalytics(): Observable<any[]> {
    return this.http.get<any[]>(this.API_BASE + '/analytics/country');
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(this.API_BASE, employeeData);
  }

  updateEmployee(id: number, employeeData: any): Observable<any> {
    return this.http.put<any>(this.API_BASE + '/' + id, employeeData);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(this.API_BASE + '/' + id);
  }
}
