import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPage } from './sign-in-page';
import { ActivatedRoute } from '@angular/router';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;

  beforeEach(async () => {
    // Mock the global google object with the expected structure
    (window as unknown as Window & { google: { accounts: { id: { initialize: jasmine.Spy, renderButton: jasmine.Spy, prompt: jasmine.Spy } } } }).google = {
      accounts: {
        id: {
          initialize: jasmine.createSpy('initialize'),
          renderButton: jasmine.createSpy('renderButton'),
          prompt: jasmine.createSpy('prompt')
        }
      }
    };
    
    await TestBed.configureTestingModule({
      imports: [SignInPage],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
