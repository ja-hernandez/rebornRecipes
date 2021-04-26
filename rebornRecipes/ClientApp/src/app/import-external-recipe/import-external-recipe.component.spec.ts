import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExternalRecipeComponent } from './import-external-recipe.component';

describe('ImportExternalRecipeComponent', () => {
  let component: ImportExternalRecipeComponent;
  let fixture: ComponentFixture<ImportExternalRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExternalRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExternalRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
