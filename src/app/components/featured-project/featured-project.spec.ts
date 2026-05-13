import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProject } from './featured-project';

describe('FeaturedProject', () => {
  let component: FeaturedProject;
  let fixture: ComponentFixture<FeaturedProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProject],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
