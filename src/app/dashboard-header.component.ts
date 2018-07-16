import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'dashboard-header',
  template: `
    <div class="header">
        <div class="header-inner">
            <div> <img src="../assets/charter_logo_white.png" [hidden]="hideImg"></div>
            <div class="space-fill"></div>
            <div class="app-name"> VOE Dashboard</div>
        </div>
    </div>
  `,
  styleUrls: ['dashboard-header.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardHeaderComponent {
  @Input() hideImg: boolean = false;
  title = 'app';
}
