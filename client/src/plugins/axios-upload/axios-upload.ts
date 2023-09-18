import { AxiosRequestConfig } from 'axios';
import { AxiosUploadAdapter } from './axios-upload-adapter';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class AxiosUploadPlugin extends Plugin {
  public static get pluginName() {
    return 'AxiosUploadPlugin' as const;
  }

  public init(): void {
    const options = this.editor.config.get('axiosUpload') as AxiosRequestConfig;

    if (!options) {
      return;
    }

    this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new AxiosUploadAdapter(loader, options);
    };
  }
}
