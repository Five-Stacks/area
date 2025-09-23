import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button-component/button-component';
import { ButtonFullComponent } from '../../components/button-component-full/button-component-full';

@Component({
  selector: 'app-welcome-page',
  imports: [ButtonComponent, ButtonFullComponent],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css'
})
export class WelcomePage {
  handleButtonClick() {
    alert('Button clicked!');
  }
}
