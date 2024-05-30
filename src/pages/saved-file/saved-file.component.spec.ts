import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFileComponent } from './saved-file.component';

describe('SavedFileComponent', () => {
  let component: SavedFileComponent;
  let fixture: ComponentFixture<SavedFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
