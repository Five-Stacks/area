import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHistory } from './area-history';

describe('AreaHistory', () => {
  let component: AreaHistory;
  let fixture: ComponentFixture<AreaHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
