import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPage } from './sign-up-page';
import { ActivatedRoute } from '@angular/router';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(async () => {
    // Mock the global google object with the expected structure
    (window as any).google = {
      accounts: {
        id: {
          initialize: jasmine.createSpy('initialize'),
          renderButton: jasmine.createSpy('renderButton'),
          prompt: jasmine.createSpy('prompt')
        }
      }
    };
    
    await TestBed.configureTestingModule({
      imports: [SignUpPage],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
