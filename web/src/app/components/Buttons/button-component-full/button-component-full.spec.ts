import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ButtonFullComponent } from './button-component-full';

describe('ButtonFullComponent', () => {
  async function setup(routerMock: { navigate: jasmine.Spy } = { navigate: jasmine.createSpy('navigate') }) {
    await TestBed.configureTestingModule({
      imports: [ButtonFullComponent],
      providers: [{ provide: Router, useValue: routerMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ButtonFullComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, routerMock } as { fixture: ComponentFixture<ButtonFullComponent>; component: ButtonFullComponent; routerMock: { navigate: jasmine.Spy } };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should call onClick when provided and not disabled', async () => {
    const { fixture, component } = await setup();
    const spy = jasmine.createSpy('onClick');
    component.onClick = spy;
    component.disabled = false;
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate when path is provided', async () => {
    const routerMock = { navigate: jasmine.createSpy('navigate') };
    const { fixture, component, routerMock: rm } = await setup(routerMock);
    component.path = '/go/here';
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(rm.navigate).toHaveBeenCalledWith(['/go/here']);
  });

  it('should do nothing when disabled', async () => {
    const routerMock = { navigate: jasmine.createSpy('navigate') };
    const { fixture, component, routerMock: rm } = await setup(routerMock);
    const spy = jasmine.createSpy('onClick');
    component.onClick = spy;
    component.path = '/x';
    component.disabled = true;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTrue();
    btn.click();
    expect(spy).not.toHaveBeenCalled();
    expect(rm.navigate).not.toHaveBeenCalled();
  });
});
