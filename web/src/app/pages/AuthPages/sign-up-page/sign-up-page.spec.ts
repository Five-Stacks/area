import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SignUpPage } from './sign-up-page';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { provideRouter, RouterLink, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth.service';

describe('SignUpPage', () => {
  let fixture: ComponentFixture<SignUpPage>;
  let component: SignUpPage;

  beforeEach(async () => {
    ((window as unknown) as Window & { google: { accounts: { id: { initialize: jasmine.Spy, renderButton: jasmine.Spy, prompt: jasmine.Spy } } } }).google = {
      accounts: {
      id: {
        initialize: jasmine.createSpy('initialize'),
        renderButton: jasmine.createSpy('renderButton'),
        prompt: jasmine.createSpy('prompt')
      }
      }
    };

    const adminAuthMock = { register: jasmine.createSpy('register').and.returnValue(of(true)) };

    await TestBed.configureTestingModule({
      imports: [RouterLink, SignUpPage],
      providers: [
        { provide: AdminAuthService, useValue: adminAuthMock },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} }, queryParams: of({}) } },
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "SIGN UP"', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.textContent.trim()).toBe('SIGN UP');
  });

  it('should render 2 text fields (name, email) and 2 password fields', () => {
    const textFields = fixture.debugElement.queryAll(By.directive(TextFieldComponent));
    const hideFields = fixture.debugElement.queryAll(By.directive(TextFieldHideComponent));
    expect(textFields.length).toBe(2);
    expect(hideFields.length).toBe(2);
  });

  it('should render the SIGN UP button with correct label', () => {
    const btnDe = fixture.debugElement.query(By.directive(ButtonFullComponent));
    expect(btnDe).toBeTruthy();
    const btn = btnDe.componentInstance as ButtonFullComponent;
    expect(btn.label).toBe('SIGN UP');
  });

  it('should call handleSignIn when SIGN UP button onClick is triggered', () => {
    const spy = spyOn(component, 'handleSignIn').and.callThrough();
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.directive(ButtonFullComponent));
    const btn = btnDe.componentInstance as ButtonFullComponent;

    expect(typeof btn.onClick).toBe('function');
    if (btn.onClick) btn.onClick();

    expect(spy).toHaveBeenCalled();
  });

  it('should update component fields via valueChange for name & email', () => {
    const [nameDe, emailDe] = fixture.debugElement.queryAll(By.directive(TextFieldComponent));
    const nameCmp = nameDe.componentInstance as TextFieldComponent;
    const emailCmp = emailDe.componentInstance as TextFieldComponent;

    nameCmp.valueChange.emit('Ada Lovelace');
    emailCmp.valueChange.emit('ada@example.com');
    fixture.detectChanges();

    expect(component.name).toBe('Ada Lovelace');
    expect(component.email).toBe('ada@example.com');
  });

  it('should update component fields via valueChange for passwords', () => {
    const [pwDe, confirmDe] = fixture.debugElement.queryAll(By.directive(TextFieldHideComponent));
    const pwCmp = pwDe.componentInstance as TextFieldHideComponent;
    const confirmCmp = confirmDe.componentInstance as TextFieldHideComponent;

    pwCmp.valueChange.emit('p@ssw0rd');
    confirmCmp.valueChange.emit('p@ssw0rd');
    fixture.detectChanges();

    expect(component.password).toBe('p@ssw0rd');
    expect(component.confirmPassword).toBe('p@ssw0rd');
  });

    it('should display the "Already on Area?" text with login mention', async () => {
      await fixture.whenStable();
      fixture.detectChanges();

      // Cible dans .login-mention pour éviter un <p> vide ailleurs
      const p: HTMLParagraphElement | null =
        fixture.nativeElement.querySelector('.login-mention');

      expect(p).withContext('paragraph not found').toBeTruthy();

      const text = (p?.textContent ?? '').trim();
      expect(text).toContain('Already on Area?');
      expect(text).toContain('Log in here.');
  });
});
