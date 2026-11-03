import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    service = TestBed.inject(TranslationService);
    TestBed.tick();
  });

  it('should sync html lang, title and description with the default language', () => {
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(TestBed.inject(Title).getTitle()).toBe('Nicolas Kleiton | Engenheiro de Software');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('Engenheiro de Software');
  });

  it('should update document metadata when the language changes', () => {
    service.toggleLanguage();
    TestBed.tick();

    expect(document.documentElement.lang).toBe('en');
    expect(TestBed.inject(Title).getTitle()).toBe('Nicolas Kleiton | Software Engineer');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('Software Engineer');
  });
});
