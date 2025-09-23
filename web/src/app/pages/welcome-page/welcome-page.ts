import { Component } from '@angular/core';
import { ButtonFullComponent } from '../../components/button-component-full/button-component-full';
import { HeaderComponent } from '../../components/header-component/header-component';

@Component({
  selector: 'app-welcome-page',
  imports: [ButtonFullComponent, HeaderComponent], 
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css'
})
export class WelcomePage {
  handleButtonClick() {
    alert('Button clicked!');
  }
}
