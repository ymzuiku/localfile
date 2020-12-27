# loadfile

简易的文件上传和下载 API

## API

```ts
declare function download(name: string, data: string): void;
declare function loadFile(): Promise<{
  name: string;
  value: string;
}>;
declare const localfile: {
  download: typeof download;
  loadFile: typeof loadFile;
};
export default localfile;
```
