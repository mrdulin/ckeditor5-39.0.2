import { Plugin } from '@ckeditor/ckeditor5-core';
import { FileLoader, UploadResponse } from '@ckeditor/ckeditor5-upload';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';

type FileDTO = {
  sentimentFileName: string;
  sentimentFileUrl: string;
};
type ApiResponse = { code: number; message: string; data: [FileDTO] };

export interface UploadAdapter {
  upload(): Promise<UploadResponse>;
  abort?(): void;
}

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
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    console.log('options: ', options);
    console.log('file: ', file);

    const data = new FormData();
    data.append('files', file);

    try {
      const res = await axios<ApiResponse>({
        responseType: 'json',
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            loader.uploadTotal = progressEvent.total;
            loader.uploaded = progressEvent.loaded;
          }
        },
        ...options,
      });
      if (res.data.code !== 0) {
        return reject(res.data.message ?? genericErrorText);
      }
      resolve({ ...res.data, default: res.data.data[0].sentimentFileUrl });
    } catch (error) {
      console.error(error);
      reject(genericErrorText);
    }
  }
}
