import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReview } from './submit-review';

describe('SubmitReview', () => {
  let component: SubmitReview;
  let fixture: ComponentFixture<SubmitReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
