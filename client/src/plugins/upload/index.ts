import { Editor, Plugin } from '@ckeditor/ckeditor5-core';
import { FileLoader, UploadResponse } from '@ckeditor/ckeditor5-upload';
import { logWarning } from '@ckeditor/ckeditor5-utils';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';

export interface UploadAdapter {
  upload(): Promise<UploadResponse>;
  abort?(): void;
}

class AxiosUploadPlugin extends Plugin {
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

class AxiosUploadAdapter implements UploadAdapter {
  constructor(public loader: FileLoader, public options: AxiosRequestConfig) {}
  public async upload() {
    return this.loader.file.then(
      (file) =>
        new Promise<any>((resolve, reject) => {
          this.sendRequest(resolve, reject, file!);
        }),
    );
  }

  private async sendRequest(resolve: (result: UploadResponse) => void, reject: (message?: string) => void, file: File) {
    const loader = this.loader;
    const options = this.options;
    const data = new FormData();
    data.append('files', file);

    const res = await axios({
      ...options,
      data,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          loader.uploadTotal = progressEvent.total;
          loader.uploaded = progressEvent.loaded;
        }
      },
    });

  }
}
