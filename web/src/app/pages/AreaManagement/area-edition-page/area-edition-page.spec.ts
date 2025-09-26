import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEditionPage } from './area-edition-page';

describe('AreaEditionPage', () => {
  let component: AreaEditionPage;
  let fixture: ComponentFixture<AreaEditionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaEditionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaEditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
