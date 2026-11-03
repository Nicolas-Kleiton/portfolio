import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProject } from './featured-project';
import { TranslationService } from '../../services/translation.service';

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

  it('should keep project cards in the DOM across change detection cycles', () => {
    const cardsBefore = Array.from(fixture.nativeElement.querySelectorAll('.project-card'));
    expect(cardsBefore.length).toBe(4);

    // Force a full refresh, like the app-wide tick triggered by any DOM event
    fixture.componentRef.changeDetectorRef.detectChanges();
    fixture.componentRef.changeDetectorRef.detectChanges();

    const cardsAfter = Array.from(fixture.nativeElement.querySelectorAll('.project-card'));
    cardsAfter.forEach((card, i) => expect(card).toBe(cardsBefore[i]));
  });

  it('should update texts when the language changes', async () => {
    const translation = TestBed.inject(TranslationService);
    translation.setLanguage('en');
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Featured Projects');
    expect(text).toContain('2nd Place Hackathon');
  });
});
