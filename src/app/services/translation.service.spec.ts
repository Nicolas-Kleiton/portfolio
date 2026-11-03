import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  const mockBrowserLanguage = (lang: string) =>
    vi.spyOn(navigator, 'language', 'get').mockReturnValue(lang);

  const createService = () => {
    const service = TestBed.inject(TranslationService);
    TestBed.tick();
    return service;
  };

  beforeEach(() => localStorage.clear());
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should use Portuguese for Portuguese browsers', () => {
    mockBrowserLanguage('pt-BR');
    expect(createService().language()).toBe('pt');
  });

  it('should fall back to English for other browser languages', () => {
    mockBrowserLanguage('de-DE');
    expect(createService().language()).toBe('en');
  });

  it('should prefer the language previously chosen by the visitor', () => {
    mockBrowserLanguage('pt-BR');
    localStorage.setItem('lang', 'en');
    expect(createService().language()).toBe('en');
  });

  it('should remember the chosen language', () => {
    mockBrowserLanguage('pt-BR');
    createService().toggleLanguage();
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should sync html lang, title and description with the language', () => {
    mockBrowserLanguage('pt-BR');
    const service = createService();

    expect(document.documentElement.lang).toBe('pt-BR');
    expect(TestBed.inject(Title).getTitle()).toBe('Nicolas Kleiton | Engenheiro de Software e IA');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('UFPB');

    service.toggleLanguage();
    TestBed.tick();

    expect(document.documentElement.lang).toBe('en');
    expect(TestBed.inject(Title).getTitle()).toBe('Nicolas Kleiton | Software and AI Engineer');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('I build systems');
  });
});
