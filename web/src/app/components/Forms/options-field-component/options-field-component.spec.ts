import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFieldComponent } from './options-field-component';

describe('OptionsFieldComponent', () => {
  let component: OptionsFieldComponent;
  let fixture: ComponentFixture<OptionsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('ngOnInit should set selectedOption to label', () => {
    component.label = 'Choose Service';
    component.ngOnInit();
    expect(component.selectedOption).toBe('Choose Service');
  });

  it('setSelectedOption should update selectedOption and emit valueChange', () => {
    spyOn(component.valueChange, 'emit');
    component.setSelectedOption('GitHub');
    expect(component.selectedOption).toBe('GitHub');
    expect(component.valueChange.emit).toHaveBeenCalledWith('GitHub');
  });

  it('onOptionChange should read event target value and emit it', () => {
    spyOn(component.valueChange, 'emit');
    component.options = ['One', 'Two'];
    component.label = 'Choose';
    fixture.detectChanges();

    const select: HTMLSelectElement | null = fixture.nativeElement.querySelector('select');
    expect(select).toBeTruthy();
    if (!select) return;

    // simulate user selecting the second option
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectedOption).toBe('Two');
    expect(component.valueChange.emit).toHaveBeenCalledWith('Two');
  });

  it('selectId should return a kebab-case id based on label', () => {
    component.label = 'Choose Service';
    expect(component.selectId).toBe('select-choose-service');
  });
});
