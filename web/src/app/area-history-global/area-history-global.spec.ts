import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHistoryGlobal } from './area-history-global';

describe('AreaHistoryGlobal', () => {
  let component: AreaHistoryGlobal;
  let fixture: ComponentFixture<AreaHistoryGlobal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaHistoryGlobal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaHistoryGlobal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
