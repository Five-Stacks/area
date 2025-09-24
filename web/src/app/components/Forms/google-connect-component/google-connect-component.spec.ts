import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleConnectComponent } from './google-connect-component';

describe('GoogleConnectComponent', () => {
  let component: GoogleConnectComponent;
  let fixture: ComponentFixture<GoogleConnectComponent>;

  // Mock the global google object before tests run
  beforeAll(() => {
    (window as any).google = {
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
    delete (window as any).google;
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
