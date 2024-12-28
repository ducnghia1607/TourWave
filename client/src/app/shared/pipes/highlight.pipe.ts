import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, search: string): SafeHtml {
    if (!search) {
      return text;
    }
    const regex = new RegExp(`(${search})`, 'gi');
    const highlightedText = text.replace(regex, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
