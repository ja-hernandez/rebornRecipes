import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkRecipeComponent } from './fork-recipe.component';

describe('ForkRecipeComponent', () => {
  let component: ForkRecipeComponent;
  let fixture: ComponentFixture<ForkRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
