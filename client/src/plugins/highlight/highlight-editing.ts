import { Editor, Plugin } from '@ckeditor/ckeditor5-core';
import { HighlightCommand } from './highlight-command';

export class HighlightEditing extends Plugin {
  init() {
    const editor = this.editor;
    this._defineSchema();
    this._defineConverters();

    editor.commands.add('highlight', new HighlightCommand(editor));

    // default config
    editor.config.define('highlight', {
      keystroke: 'Ctrl+Alt+H',
    });
    const keystroke = editor.config.get('highlight.keystroke') as string;
    // keystrokes
    editor.keystrokes.set(keystroke, 'highlight');
  }

  _defineSchema() {
    this.editor.model.schema.extend('$text', {
      allowAttributes: 'highlight',
    });
  }

  _defineConverters() {
    // conversion helper
    // editor.conversion.attributeToElement({
    //   model: 'highlight',
    //   view: 'mark',
    // });s

    // without using a helper
    // Convert the input `<mark>` HTML element to model attribute.
    this.editor.conversion.for('upcast').elementToAttribute({
      model: 'highlight',
      view: 'mark',
    });

    // Convert model attribute to output `<mark>` HTML element.
    this.editor.conversion.for('dataDowncast').attributeToElement({
      model: 'highlight',
      view: 'mark',
    });

    // Convert model attribute to `<mark>` in editing view.
    this.editor.conversion.for('editingDowncast').attributeToElement({
      model: 'highlight',
      view: 'mark',
    });
  }
}

// old style
// export function Highlight(editor: Editor) {
//   console.log('Highlight plugin has been registered');

//   editor.model.schema.extend('$text', {
//     allowAttributes: 'highlight',
//   });

//   // conversion helper
//   // editor.conversion.attributeToElement({
//   //   model: 'highlight',
//   //   view: 'mark',
//   // });s

//   // without using a helper
//   // Convert the input `<mark>` HTML element to model attribute.
//   editor.conversion.for('upcast').elementToAttribute({
//     model: 'highlight',
//     view: 'mark',
//   });

//   // Convert model attribute to output `<mark>` HTML element.
//   editor.conversion.for('dataDowncast').attributeToElement({
//     model: 'highlight',
//     view: 'mark',
//   });

//   // Convert model attribute to `<mark>` in editing view.
//   editor.conversion.for('editingDowncast').attributeToElement({
//     model: 'highlight',
//     view: 'mark',
//   });

//   editor.commands.add('highlight', new HighlightCommand(editor));

//   // default config
//   editor.config.define('highlight', {
//     keystroke: 'Ctrl+Alt+H',
//   });
//   const keystroke = editor.config.get('highlight.keystroke') as string;

//   // ui
//   editor.ui.componentFactory.add('highlight', (locale) => {
//     const button = new ButtonView(locale);
//     const command = editor.commands.get('highlight');
//     const t = editor.t;

//     button.set({
//       label: t('Highlight'),
//       withText: true,
//       tooltip: true,
//       isToggleable: true,
//       keystroke,
//     });

//     button.on('execute', () => {
//       editor.execute('highlight');
//       editor.editing.view.focus();
//     });

//     button.bind('isOn', 'isEnabled').to(command as any, 'value', 'isEnabled');

//     return button;
//   });

//   // keystrokes
//   editor.keystrokes.set(keystroke, 'highlight');
// }
