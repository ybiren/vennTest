import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSearchesModalComponent } from './saved-searches-modal.component';

describe('SavedSearchesModalComponent', () => {
  let component: SavedSearchesModalComponent;
  let fixture: ComponentFixture<SavedSearchesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedSearchesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedSearchesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
