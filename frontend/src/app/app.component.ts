import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "salary-management-frontend";
}
