import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employee: any = null;
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  employeeForm!: FormGroup;

  departments = ['Engineering', 'Product', 'HR', 'Sales', 'Marketing', 'Finance', 'Legal', 'Operations'];
  countries = ['USA', 'UK', 'Germany', 'India', 'Canada', 'Australia', 'Singapore', 'Japan'];
  currencies = ['USD', 'GBP', 'EUR', 'INR', 'CAD', 'AUD', 'SGD', 'JPY'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && this.employeeForm) {
      this.initForm();
    }
  }

  initForm() {
    this.employeeForm = this.fb.group({
      firstName: [this.employee?.firstName || '', [Validators.required]],
      lastName: [this.employee?.lastName || '', [Validators.required]],
      email: [this.employee?.email || '', [Validators.required, Validators.email]],
      department: [this.employee?.department || '', [Validators.required]],
      country: [this.employee?.country || '', [Validators.required]],
      baseSalary: [this.employee?.baseSalary || '', [Validators.required, Validators.min(0)]],
      bonus: [this.employee?.bonus || 0, [Validators.required, Validators.min(0)]],
      currency: [this.employee?.currency || 'USD', [Validators.required]],
      effectiveDate: [this.employee?.effectiveDate ? this.employee.effectiveDate.split('T')[0] : new Date().toISOString().split('T')[0], [Validators.required]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = {
        ...(this.employee?.id ? { id: this.employee.id } : {}),
        ...this.employeeForm.value
      };
      this.save.emit(formData);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
