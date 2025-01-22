import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingListPageComponent } from './reading-list-page.component';

describe('ReadingListPageComponent', () => {
  let component: ReadingListPageComponent;
  let fixture: ComponentFixture<ReadingListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
