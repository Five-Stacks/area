import { Component } from '@angular/core';
import { ButtonFullComponent } from '../../components/button-component-full/button-component-full';
import { ButtonWithIconComponent } from '../../components/button-with-icon-component/button-with-icon-component';

@Component({
  selector: 'app-dashboard-page',
  imports: [ButtonFullComponent, ButtonWithIconComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage {

}
