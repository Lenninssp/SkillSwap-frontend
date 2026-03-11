import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostings } from './my-postings';

describe('MyPostings', () => {
  let component: MyPostings;
  let fixture: ComponentFixture<MyPostings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPostings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
