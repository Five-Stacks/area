import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithIconComponent } from './button-with-icon-component';
import { Router } from '@angular/router';

describe('ButtonWithIconComponent', () => {
  // Helper to configure TestBed with an optional router mock
  async function setup(routerMock: { navigate: jasmine.Spy } = { navigate: jasmine.createSpy('navigate') }) {
    await TestBed.configureTestingModule({
      imports: [ButtonWithIconComponent],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ButtonWithIconComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, routerMock } as { fixture: ComponentFixture<ButtonWithIconComponent>; component: ButtonWithIconComponent; routerMock: { navigate: jasmine.Spy } };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should call provided onClick when clicked', async () => {
    const { fixture, component } = await setup();
    const clickSpy = jasmine.createSpy('clickSpy');
    component.onClick = clickSpy;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should navigate when path is provided and clicked', async () => {
    const routerMock = { navigate: jasmine.createSpy('navigate') };
    const { fixture, component, routerMock: rm } = await setup(routerMock);
    component.path = '/some/path';
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(rm.navigate).toHaveBeenCalledWith(['/some/path']);
  });

  it('should not call onClick when disabled', async () => {
    const { fixture, component } = await setup();
    const clickSpy = jasmine.createSpy('clickSpy');
    component.onClick = clickSpy;
    component.disabled = true;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    // Simulate DOM disabled behavior: clicking a disabled button doesn't emit click in browser,
    // but programmatic click() still triggers, so guard by checking disabled attribute
    expect(btn.disabled).toBeTrue();

    btn.click();
    // onClick should not be called when button is disabled
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
