import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCataloguePageComponent } from './book-catalogue-page.component';

describe('BookCataloguePageComponent', () => {
  let component: BookCataloguePageComponent;
  let fixture: ComponentFixture<BookCataloguePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCataloguePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCataloguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
