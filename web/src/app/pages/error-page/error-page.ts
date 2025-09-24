import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css'
})
export class ErrorPage implements OnInit {
  private route = inject(ActivatedRoute);
  
  errorMessage = 'Page not found';

  ngOnInit() {
    // Check for custom error message from query parameters
    const message = this.route.snapshot.queryParams['message'];
    if (message) {
      this.errorMessage = message;
    }
  }
}
