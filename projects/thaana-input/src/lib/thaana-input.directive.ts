import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

const Keys = {
  33: '!', 34: '"', 35: '#', 36: '$', 37: '%', 38: '&', 39: '\'', 40: ')', 41: '(', 42: '*', 43: '+', 44: '،', 45: '-', 46: '.',
  47: '/', 58: ':', 59: '؛', 60: '>', 61: '=', 62: '<', 63: '؟', 64: '@', 65: 'ާ', 66: 'ޞ', 67: 'ޝ', 68: 'ޑ', 69: 'ޭ', 70: 'ﷲ',
  71: 'ޣ', 72: 'ޙ', 73: 'ީ', 74: 'ޛ', 75: 'ޚ', 76: 'ޅ', 77: 'ޟ', 78: 'ޏ', 79: 'ޯ', 80: '÷', 81: 'ޤ', 82: 'ޜ', 83: 'ށ', 84: 'ޓ',
  85: 'ޫ', 86: 'ޥ', 87: 'ޢ', 88: 'ޘ', 89: 'ޠ', 90: 'ޡ', 91: ']', 92: '\\', 93: '[', 94: '^', 95: '_', 96: '`', 97: 'ަ', 98: 'ބ',
  99: 'ޗ', 100: 'ދ', 101: 'ެ', 102: 'ފ', 103: 'ގ', 104: 'ހ', 105: 'ި', 106: 'ޖ', 107: 'ކ', 108: 'ލ', 109: 'މ', 110: 'ނ', 111: 'ޮ',
  112: 'ޕ', 113: 'ް', 114: 'ރ', 115: 'ސ', 116: 'ތ', 117: 'ު', 118: 'ވ', 119: 'އ', 120: '×', 121: 'ޔ', 122: 'ޒ', 123: '}',
  124: '|', 125: '{', 126: '~'
};

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[thaanaInput]',
    standalone: false
})
export class ThaanaInputDirective {
  @Output() thaanaInput = new EventEmitter();

  constructor(
    private elementRef: ElementRef
  ) {
    elementRef.nativeElement.style.textAlign = 'right';
    elementRef.nativeElement.style.direction = 'rtl';
    elementRef.nativeElement.addEventListener('input', this.handleKeyboardInput.bind(this));
  }

  handleKeyboardInput(e): boolean {
    let current = '';
    const str = e.target.value;
    let key;
    let selectionMode = false;
    let selectionStart = 0;

    if (!str) {
      return;
    }
    if (e.target.selectionEnd < str.length && e.target.selectionEnd > 0) {
      selectionMode = true;
      selectionStart = e.target.selectionEnd;
      key = str.substring(e.target.selectionEnd - 1, e.target.selectionEnd);
    }
    else {
      key = str.substring(str.length - 1);
    }
    const k = key.charCodeAt(0);

    if ((typeof (Keys[k]) !== 'undefined')) {
      if (selectionMode) {
        current = e.target.value.substr(0, e.target.selectionStart - 1) + Keys[k] + e.target.value.substr(e.target.selectionStart);
      }
      else {
        current = e.target.value.substr(0, str.length - 1);
        current += Keys[k];
      }
      e.target.value = current;
      if (selectionMode) {
        e.target.selectionStart = selectionStart;
        e.target.selectionEnd = selectionStart;
      }
      this.thaanaInput.emit(current);
    }
    return false;
  }

}
