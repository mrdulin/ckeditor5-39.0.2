import { Plugin } from '@ckeditor/ckeditor5-core';
import { HighlightEditing } from './highlight-editing';
import { HighlightUI } from './highlight-ui';

export class Highlight extends Plugin {
  static get requires() {
    return [HighlightUI, HighlightEditing];
  }
}
