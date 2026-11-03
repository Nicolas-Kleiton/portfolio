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
    expect(TestBed.inject(Title).getTitle()).toBe('Nicolas Kleiton | Desenvolvedor Fullstack');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('Desenvolvedor Fullstack');
  });

  it('should update document metadata when the language changes', () => {
    service.toggleLanguage();
    TestBed.tick();

    expect(document.documentElement.lang).toBe('en');
    expect(TestBed.inject(Title).getTitle()).toBe('Nicolas Kleiton | Fullstack Developer');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content'))
      .toContain('Fullstack Developer');
  });
});
