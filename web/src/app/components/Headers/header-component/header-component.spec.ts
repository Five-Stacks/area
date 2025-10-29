import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header-component';

describe('HeaderComponent', () => {
  async function setup(routerMock: { navigate: jasmine.Spy } = { navigate: jasmine.createSpy('navigate') }) {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: Router, useValue: routerMock }]
    })
    .compileComponents();

    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, routerMock } as { fixture: ComponentFixture<HeaderComponent>; component: HeaderComponent; routerMock: { navigate: jasmine.Spy } };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('navigateToHome should call router.navigate with /welcome', async () => {
    const { component, routerMock } = await setup();
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/welcome']);
  });

  it('should render logo and navigate on logo click', async () => {
    const { fixture, routerMock } = await setup();
    const el: HTMLElement = fixture.nativeElement;
    const logoBtn = el.querySelector('.logo-container') as HTMLElement | null;
    expect(logoBtn).toBeTruthy();
    const img = el.querySelector('img.logo');
    expect(img).toBeTruthy();
    expect(img!.getAttribute('src')).toBe('/assets/logo.png');

    logoBtn!.click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/welcome']);
  });
});
