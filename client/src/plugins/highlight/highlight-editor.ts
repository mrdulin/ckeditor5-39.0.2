import { Editor } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import { HighlightCommand } from './highlight-command';

export function Highlight(editor: Editor) {
  console.log('Highlight plugin has been registered');

  editor.model.schema.extend('$text', {
    allowAttributes: 'highlight',
  });

  // conversion helper
  // editor.conversion.attributeToElement({
  //   model: 'highlight',
  //   view: 'mark',
  // });s

  // without using a helper
  // Convert the input `<mark>` HTML element to model attribute.
  editor.conversion.for('upcast').elementToAttribute({
    model: 'highlight',
    view: 'mark',
  });

  // Convert model attribute to output `<mark>` HTML element.
  editor.conversion.for('dataDowncast').attributeToElement({
    model: 'highlight',
    view: 'mark',
  });

  // Convert model attribute to `<mark>` in editing view.
  editor.conversion.for('editingDowncast').attributeToElement({
    model: 'highlight',
    view: 'mark',
  });

  editor.commands.add('highlight', new HighlightCommand(editor));

  // ui
  editor.ui.componentFactory.add('highlight', (locale) => {
    const button = new ButtonView(locale);
    const command = editor.commands.get('highlight');
    const t = editor.t;

    button.set({
      label: t('Highlight'),
      withText: true,
      tooltip: true,
      isToggleable: true,
    });

    button.on('execute', () => {
      editor.execute('highlight');
      editor.editing.view.focus();
    });

    button.bind('isOn', 'isEnabled').to(command as any, 'value', 'isEnabled');

    return button;
  });
}