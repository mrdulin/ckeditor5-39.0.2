import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LineHeightEditing from './lineheight-editing';
import LineHeightUI from './lineheight-ui';

export default class LineHeight extends Plugin {
  static get requires() {
    return [LineHeightEditing, LineHeightUI];
  }

  static get pluginName() {
    return 'LineHeight';
  }
}
