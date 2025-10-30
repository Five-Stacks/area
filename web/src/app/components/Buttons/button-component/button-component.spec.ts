import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ButtonComponent } from './button-component';

describe('ButtonComponent', () => {
  async function setup(routerMock: { navigate: jasmine.Spy } = { navigate: jasmine.createSpy('navigate') }) {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, routerMock } as { fixture: ComponentFixture<ButtonComponent>; component: ButtonComponent; routerMock: { navigate: jasmine.Spy } };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should call onClick when not disabled', async () => {
    const { fixture, component } = await setup();
    const clickSpy = jasmine.createSpy('clickSpy');
    component.onClick = clickSpy;
    component.disabled = false;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should navigate when path is provided', async () => {
    const routerMock = { navigate: jasmine.createSpy('navigate') };
    const { fixture, component, routerMock: rm } = await setup(routerMock);
    component.path = '/test/path';
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(rm.navigate).toHaveBeenCalledWith(['/test/path']);
  });

  it('should not call onClick or navigate when disabled', async () => {
    const routerMock = { navigate: jasmine.createSpy('navigate') };
    const { fixture, component, routerMock: rm } = await setup(routerMock);
    const clickSpy = jasmine.createSpy('clickSpy');
    component.onClick = clickSpy;
    component.path = '/x';
    component.disabled = true;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTrue();
    btn.click();
    expect(clickSpy).not.toHaveBeenCalled();
    expect(rm.navigate).not.toHaveBeenCalled();
  });
});
