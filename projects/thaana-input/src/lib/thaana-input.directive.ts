import {Directive, ElementRef, HostListener} from '@angular/core';

const Keys = {
  q: 'ް',
  w: 'އ',
  e: 'ެ',
  r: 'ރ',
  t: 'ތ',
  y: 'ޔ',
  u: 'ު',
  i: 'ި',
  o: 'ޮ',
  p: 'ޕ',
  a: 'ަ',
  s: 'ސ',
  d: 'ދ',
  f: 'ފ',
  g: 'ގ',
  h: 'ހ',
  j: 'ޖ',
  k: 'ކ',
  l: 'ލ',
  z: 'ޒ',
  x: '×',
  c: 'ޗ',
  v: 'ވ',
  b: 'ބ',
  n: 'ނ',
  m: 'މ',
  Q: 'ޤ',
  W: 'ޢ',
  E: 'ޭ',
  R: 'ޜ',
  T: 'ޓ',
  Y: 'ޠ',
  U: 'ޫ',
  I: 'ީ',
  O: 'ޯ',
  P: '÷',
  A: 'ާ',
  S: 'ށ',
  D: 'ޑ',
  F: 'ﷲ',
  G: 'ޣ',
  H: 'ޙ',
  J: 'ޛ',
  K: 'ޚ',
  L: 'ޅ',
  Z: 'ޡ',
  X: 'ޘ',
  C: 'ޝ',
  V: 'ޥ',
  B: 'ޞ',
  N: 'ޏ',
  M: 'ޟ',
  ',': '،',
  ';': '؛',
  '?': '؟',
  '<': '>',
  '>': '<',
  '[': ']',
  ']': '[',
  '(': ')',
  ')': '(',
  '{': '}',
  '}': '{',
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[thaanaInput]'
})
export class ThaanaInputDirective {

  selectionStart: number;
  selectionEnd: number;
  key: string;
  value: string;
  valueLength: number;

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent): void {

    this.key = event.key;
    this.value = this.elementRef.nativeElement.value;
    this.selectionStart = this.elementRef.nativeElement.selectionStart;
    this.selectionEnd = this.elementRef.nativeElement.selectionEnd;
    this.valueLength = this.elementRef.nativeElement.value.length;
  }
  @HostListener('input', ['$event'])
  inputChange(event: InputEvent): void {
    let inputKey = this.key === 'Unidentified' ? event.data : this.key;

    if (inputKey !== null) {
      inputKey = inputKey.substring(inputKey.length - 1);
    }

    if (['Spacebar', 'Backspace'].indexOf(inputKey) === -1) {

      // set to null for special keyboard values, except for the IE and Edge (above)
      if (event.data !== null) {

        const value = this.elementRef.nativeElement.value;
        // Trying to handle Android autocorrect, next-word suggestion
        if (inputKey === value) {
          inputKey = value.split(this.value).join('');
        }

        // remove the inserted character latin character
        this.elementRef.nativeElement.value = this.value.split(value).join('');
        this.mapLetter(this.elementRef.nativeElement, inputKey);
      }
    }
    //
    // stop word deletion and make sure it's not a selection, again Android autocorrect, next-word suggestion
    if (this.valueLength - this.elementRef.nativeElement.value.length > 1 && this.selectionStart === this.selectionEnd) {
      this.elementRef.nativeElement.value = this.value.substring(0, this.valueLength - 1);
    }
  }
  constructor(
    private elementRef: ElementRef
  ) {
    elementRef.nativeElement.style.textAlign = 'right';
    elementRef.nativeElement.style.direction = 'rtl';
  }

  mapLetter(elementRef: HTMLInputElement, key: string): void {
    const value = Keys[key] || key;

    // It's a selection
    if (this.selectionStart !== this.selectionEnd) {
      elementRef.value = elementRef.value.substring(0, this.selectionStart) + elementRef.value.substring(this.selectionEnd);
    }

    elementRef.value = elementRef.value.substring(0, this.selectionStart) + value + elementRef.value.substring(this.selectionStart);

    // maintain cursor pointer after replacement
    elementRef.selectionStart = this.selectionStart + 1;
    elementRef.selectionEnd = this.selectionEnd + 1;
  }

}
