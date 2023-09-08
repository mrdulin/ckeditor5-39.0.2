import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import { Bold, Code, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { FontBackgroundColor, FontColor, FontFamily, FontSize, Font } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { DataFilter, DataSchema, GeneralHtmlSupport, HtmlComment } from '@ckeditor/ckeditor5-html-support';
import { AutoImage, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, ListProperties } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { StandardEditingMode } from '@ckeditor/ckeditor5-restricted-editing';
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
} from '@ckeditor/ckeditor5-special-characters';
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { Highlight } from './plugins/highlight/highlight';

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    AutoImage,
    AutoLink,
    Autoformat,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    DataFilter,
    DataSchema,
    Essentials,
    FindAndReplace,
    Font,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    StandardEditingMode,
    Strikethrough,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    UploadAdapter,
    WordCount,
    SimpleUploadAdapter,
    Highlight,
  ];

  public static override defaultConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'fontFamily',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        '|',
        'alignment:left',
        'alignment:right',
        'alignment:center',
        'alignment:justify',
        '|',
        'findAndReplace',
        'horizontalLine',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'removeFormat',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        'highlight',
      ],
      shouldNotGroupWhenFull: true,
    },
    simpleUpload: {
      uploadUrl: 'http://localhost:5000/upload',
    },
    highlight: {
      keystroke: 'Ctrl+Alt+H',
    },
    language: 'zh-cn',
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
      ],
    } as any,
    fontFamily: {
      options: ['default', '宋体', '仿宋', '楷体', '微软雅黑', '黑体', '华文楷体', '华文行楷', ''],
    },
    fontSize: {
      options: [9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28],
      supportAllValues: true,
    },
    image: {
      toolbar: ['imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', 'linkImage'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties'],
    },
  };
}

export default Editor;
