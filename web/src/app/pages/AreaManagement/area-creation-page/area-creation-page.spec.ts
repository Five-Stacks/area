import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AreaCreationPage } from './area-creation-page';

describe('AreaCreationPage', () => {
  let component: AreaCreationPage;
  let fixture: ComponentFixture<AreaCreationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaCreationPage, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
