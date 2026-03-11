import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJob } from './edit-job';

describe('EditJob', () => {
  let component: EditJob;
  let fixture: ComponentFixture<EditJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
