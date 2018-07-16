import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "side-nav",
  template: `
    <div class="side-nav" [navHighlight]="1">
        <span>
        <div class="icon">
            <mat-icon (click)="route(['/'])">home</mat-icon>
        </div>
        <div class="label" (click)="route(['/'])">Home</div>
        </span>

        <span (click)="route(['/projects/index'])">
        <div class="icon">
        <mat-icon >folder</mat-icon>
        </div>
        <div class="label">Projects</div>
        </span>

        <span  (click)="route(['/projects'])">
        <div class="icon">
            <mat-icon>create_new_folder</mat-icon>
        </div>
        <div class="label">New Project</div>
        </span>

        <span (click)="route(['/download'])">
        <div class="icon">
            <mat-icon>cloud_download</mat-icon>
        </div>
        <div class="label">Download</div>
        </span>

        <span (click)="route(['/settings'])">
        <div class="icon">
            <mat-icon>settings</mat-icon>
        </div>
        <div class="label">Settings</div>
        </span>

       
        
    </div>
  `,
  styleUrls: ["side-nav.css"],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent {
  constructor(
    public router: Router,
  ) {}

  route(to: any) {
    if (!sessionStorage.getItem("username")) {
      to = ["/"];
    }
    this.router.navigate(to);
  }
}
