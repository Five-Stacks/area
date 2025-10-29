import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashBoardComponent } from './header-component-dashboard';
import { Router } from '@angular/router';

describe('HeaderDashBoardComponent', () => {
  async function setup(routerMock: any = { navigate: jasmine.createSpy('navigate') }) {
    await TestBed.configureTestingModule({
      imports: [HeaderDashBoardComponent],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(HeaderDashBoardComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, routerMock } as { fixture: ComponentFixture<HeaderDashBoardComponent>; component: HeaderDashBoardComponent; routerMock: any };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard when navigateToHome is called', async () => {
    const { component, routerMock } = await setup();
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should render title and call navigate on logo click', async () => {
    const { fixture, routerMock } = await setup();
    const el: HTMLElement = fixture.nativeElement;
    const titleEl = el.querySelector('.logo-text');
    expect(titleEl).toBeTruthy();
    // default title
    expect(titleEl!.textContent).toContain('Dashboard');

    const btn = el.querySelector('.logo-container') || el.querySelector('button');
    expect(btn).toBeTruthy();
    (btn as HTMLElement).click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
