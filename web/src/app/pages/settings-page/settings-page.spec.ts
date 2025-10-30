import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPage } from './settings-page';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header dashboard in template', () => {
    const el: HTMLElement = fixture.nativeElement;
    const header = el.querySelector('app-area-header-dashboard');
    expect(header).toBeTruthy();
  });
});
