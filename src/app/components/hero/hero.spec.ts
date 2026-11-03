import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start typing the first role', () => {
    expect(component.displayText()).toBe('D');
  });
});
