import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSearch } from './jobs-search';

describe('JobsSearch', () => {
  let component: JobsSearch;
  let fixture: ComponentFixture<JobsSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
