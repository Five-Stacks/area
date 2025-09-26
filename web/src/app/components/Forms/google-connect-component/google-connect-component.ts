  import { Component, OnInit, NgZone, inject } from '@angular/core';

  interface GoogleInitializeOptions {
    client_id: string;
    callback: (response: { credential: string }) => void;
  }

  interface GoogleRenderOptions {
    theme: string;
    size: string;
  }

  interface GoogleAccount {
    accounts: {
      id: {
        initialize: (options: GoogleInitializeOptions) => void;
        renderButton: (element: HTMLElement | null, options: GoogleRenderOptions) => void;
        prompt: () => void;
      }
    }
  }

  declare const google: GoogleAccount;

  @Component({
    selector: 'app-google-sign-in',
    templateUrl: './google-connect-component.html',
    styleUrls: ['./google-connect-component.css'],
    imports: [],
  })
  export class GoogleConnectComponent implements OnInit {

    ngZone = inject(NgZone);
    ngOnInit(): void {
      this.initializeGoogleSignIn();
    }

    initializeGoogleSignIn() {
      google.accounts.id.initialize({
        client_id: '43660149375-ep3sc75ahad24u1v543h704ntpvsfro3.apps.googleusercontent.com',
        callback: (response:
          { credential: string }
        ) => this.handleCredentialResponse(response)
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          // Apparence
          theme: 'outline',
          size: 'large',
        }
      );

      google.accounts.id.prompt(); // also display the One Tap dialog
    }

    handleCredentialResponse(response: { credential: string }) {
      alert('Encoded JWT ID token: ' + response.credential);
    }
  }