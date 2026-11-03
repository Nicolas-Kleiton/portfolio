import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.destroy();
  });

  it('should render every page section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    for (const id of ['home', 'about', 'projects', 'contact']) {
      expect(compiled.querySelector(`#${id}`)).not.toBeNull();
    }
    fixture.destroy();
  });
});
