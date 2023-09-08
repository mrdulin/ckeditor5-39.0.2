import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

export class HighlightUI extends Plugin {
  init() {
    this.editor.ui.componentFactory.add('highlight', (locale) => {
      const button = new ButtonView(locale);
      const command = this.editor.commands.get('highlight');
      const t = this.editor.t;

      const keystroke = this.editor.config.get('highlight.keystroke') as string;

      button.set({
        label: t('高亮'),
        withText: true,
        tooltip: true,
        isToggleable: true,
        keystroke,
      });

      button.on('execute', () => {
        this.editor.execute('highlight');
        this.editor.editing.view.focus();
      });

      button.bind('isOn', 'isEnabled').to(command as any, 'value', 'isEnabled');

      return button;
    });
  }
}
