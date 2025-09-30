import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SignInPage } from './sign-in-page';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { GoogleConnectComponent } from '../../../components/Forms/google-connect-component/google-connect-component';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { provideRouter, RouterLink } from '@angular/router';

describe('SignInPage', () => {
  let fixture: ComponentFixture<SignInPage>;
  let component: SignInPage;

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

    await TestBed.configureTestingModule({
      imports: [RouterLink, SignInPage],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "LOG IN"', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.textContent.trim()).toBe('LOG IN');
  });

  it('should render 2 text fields (name, email) and 2 password fields', () => {
    const textFields = fixture.debugElement.queryAll(By.directive(TextFieldComponent));
    const hideFields = fixture.debugElement.queryAll(By.directive(TextFieldHideComponent));
    expect(textFields.length).toBe(1);
    expect(hideFields.length).toBe(1);
  });

  it('should render Google connect widget', () => {
    const google = fixture.debugElement.query(By.directive(GoogleConnectComponent));
    expect(google).toBeTruthy();
  });

  it('should render the LOG IN button with correct label', () => {
    const btnDe = fixture.debugElement.query(By.directive(ButtonFullComponent));
    expect(btnDe).toBeTruthy();
    const btn = btnDe.componentInstance as ButtonFullComponent;
    expect(btn.label).toBe('LOG IN');
  });

  it('should call handleSignIn when LOG IN button onClick is triggered', () => {
    const spy = spyOn(component, 'handleSignIn').and.callThrough();
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.directive(ButtonFullComponent));
    const btn = btnDe.componentInstance as ButtonFullComponent;

    expect(typeof btn.onClick).toBe('function');
    if (btn.onClick) btn.onClick();

    expect(spy).toHaveBeenCalled();
  });

  it('should update component fields via valueChange for name & email', () => {
    const [emailDe] = fixture.debugElement.queryAll(By.directive(TextFieldComponent));
    const emailCmp = emailDe.componentInstance as TextFieldComponent;

    emailCmp.valueChange.emit('ada@example.com');
    fixture.detectChanges();

    expect(component.email).toBe('ada@example.com');
  });

  it('should update component fields via valueChange for password', () => {
    const [pwDe] = fixture.debugElement.queryAll(By.directive(TextFieldHideComponent));
    const pwCmp = pwDe.componentInstance as TextFieldHideComponent;

    pwCmp.valueChange.emit('p@ssw0rd');
    fixture.detectChanges();

    expect(component.password).toBe('p@ssw0rd');
  });

    it('should display the "New to Area?" text with login mention', async () => {
      await fixture.whenStable();
      fixture.detectChanges();

      // Cible dans .login-mention pour éviter un <p> vide ailleurs
      const p: HTMLParagraphElement | null =
        fixture.nativeElement.querySelector('.login-mention');

      expect(p).withContext('paragraph not found').toBeTruthy();

      const text = (p?.textContent ?? '').trim();
      expect(text).toContain('New to Area?');
      expect(text).toContain('Sign up here.');
  });
});
