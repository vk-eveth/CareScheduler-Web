import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {}
