import { FileLoader, UploadAdapter, UploadResponse } from '@ckeditor/ckeditor5-upload';
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { api } from './api';

export type FileValidatorResult = { error: Error | undefined | null };
export type DMAxiosUploadOptions = AxiosRequestConfig & {
  fileValidator?(file: File): Promise<FileValidatorResult>;
};

type FileDTO = {
  sentimentFileName: string;
  sentimentFileUrl: string;
};
export type ApiResponse = { code: number; message: string; data: [FileDTO] };

export class DMAxiosUploadAdapter implements UploadAdapter {
  constructor(public loader: FileLoader, public options: DMAxiosUploadOptions) {}
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
    const genericErrorText = `上传文件失败: ${file.name}.`;

    if (this.options.fileValidator) {
      const result = await this.options.fileValidator(file);
      if (result.error) {
        return reject(result.error.message);
      }
    }

    const data = new FormData();
    data.append('files', file);

    try {
      const res = await api<ApiResponse>({
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
