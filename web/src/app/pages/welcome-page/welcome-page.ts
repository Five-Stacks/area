import { Component } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { HeaderComponent } from '../../components/Headers/header-component/header-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  imports: [ButtonFullComponent, HeaderComponent, CommonModule], 
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css'
})
export class WelcomePage {
  handleButtonClick() {
    alert('Button clicked!');
  }

  services: {
    title: string;
    icon: string;
  }[] = [
    { title: 'Gmail', icon: 'assets/icons/gmail.png' },
    { title: 'Calendar', icon: 'assets/icons/calendar.png' },
    { title: 'Discord', icon: 'assets/icons/discord.png' }
  ];
}
