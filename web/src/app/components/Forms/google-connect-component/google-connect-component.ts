import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-connect-component.html',
  styleUrls: ['./google-connect-component.css'],
  imports: [],
})
export class GoogleConnectComponent {
  private apiService = inject(ApiService);
  private route = inject(Router);

  connectGoogle() {
    this.apiService.get('/Oauth/google/login').subscribe((response) => {
      this.route.navigate(['/dashboard']);
    });
  }
}
