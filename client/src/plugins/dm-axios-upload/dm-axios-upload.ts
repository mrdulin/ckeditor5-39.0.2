import { Plugin } from '@ckeditor/ckeditor5-core';
import { DMAxiosUploadOptions, DMAxiosUploadAdapter } from './dm-axios-upload-adapter';

export default class DMAxiosUploadPlugin extends Plugin {
  public static get pluginName() {
    return 'DMAxiosUploadPlugin' as const;
  }

  public init(): void {
    const options = this.editor.config.get('dmAxiosUpload') as DMAxiosUploadOptions;

    if (!options) {
      return;
    }

    this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new DMAxiosUploadAdapter(loader, options);
    };
  }
}
