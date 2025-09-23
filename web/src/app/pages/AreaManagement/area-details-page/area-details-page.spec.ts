import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDetailsPage } from './area-details-page';

describe('AreaDetailsPage', () => {
  let component: AreaDetailsPage;
  let fixture: ComponentFixture<AreaDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
