import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { isSupported } from './utils';
import LineHeightCommand from './lineheight-command';
import { Editor } from '@ckeditor/ckeditor5-core';

export default class LineHightEditing extends Plugin {
  constructor(editor: Editor) {
    super(editor);

    editor.config.define('lineHeight', {
      options: [0, 0.5, 1, 1.5, 2],
    });
  }

  init() {
    const editor = this.editor;
    const schema = editor.model.schema;

    // Filter out unsupported options.
    const enabledOptions = (editor.config.get('lineHeight.options') as any[]).map((option) => String(option)).filter(isSupported);

    // Allow alignment attribute on all blocks.
    schema.extend('$block', { allowAttributes: 'lineHeight' });
    editor.model.schema.setAttributeProperties('lineHeight', { isFormatting: true });

    const definition = this.buildDefinition(enabledOptions /* .filter( option => !isDefault( option ) ) */);

    editor.conversion.attributeToAttribute(definition);

    editor.commands.add('lineHeight', new LineHeightCommand(editor));
  }

  buildDefinition(options: string[]) {
    const definition = {
      model: {
        key: 'lineHeight',
        values: options.slice(),
      },
      view: {} as Record<string, any>,
    };

    for (const option of options) {
      definition.view[option] = {
        key: 'style',
        value: {
          'line-height': option,
        },
      };
    }

    return definition;
  }
}
