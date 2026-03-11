import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJob } from './create-job';

describe('CreateJob', () => {
  let component: CreateJob;
  let fixture: ComponentFixture<CreateJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
