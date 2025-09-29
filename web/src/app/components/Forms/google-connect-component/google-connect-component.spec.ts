import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleConnectComponent } from './google-connect-component';

describe('GoogleConnectComponent', () => {
  let component: GoogleConnectComponent;
  let fixture: ComponentFixture<GoogleConnectComponent>;

  // Mock the global google object before tests run
  beforeAll(() => {
    (window as unknown as Window & { google: { accounts: { id: { initialize: jasmine.Spy, renderButton: jasmine.Spy, prompt: jasmine.Spy } } } }).google = {
      accounts: {
        id: {
          initialize: jasmine.createSpy('initialize'),
          renderButton: jasmine.createSpy('renderButton'),
          prompt: jasmine.createSpy('prompt')
        }
      }
    };
  });

  afterAll(() => {
    if ('google' in window) {
      delete (window as { google?: unknown }).google;
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleConnectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
