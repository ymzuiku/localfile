function fake_click(obj: any) {
  const ev = document.createEvent("MouseEvents");
  ev.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  obj.dispatchEvent(ev);
}

function download(name: string, data: string) {
  const urlObject = window.URL || window.webkitURL || window;

  const downloadData = new Blob([data]);

  const save_link = document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "a"
  ) as any;
  save_link.href = urlObject.createObjectURL(downloadData);
  save_link.download = name;
  fake_click(save_link);
}

function loadFile(): Promise<{ name: string; value: string }> {
  return new Promise((res) => {
    const ele = FileUploadElement({
      onchange: ((v: string, n: string) => {
        res({ name: n, value: v });
        ele.remove();
      }) as any,
    });
    ele.style.position = "fixed";
    ele.style.left = "-200px";
    ele.style.top = "-200px";
    document.body.append(ele);
    (ele as any).onclick();
  });
}

interface IFileUpload {
  onchange?: any;
}

function FileUploadElement({ onchange }: IFileUpload) {
  const box = document.createElement("div");
  const input = document.createElement("input");
  input.type = "file";
  input.style.display = "none";
  input.style.width = "100%";
  input.style.height = "100%";
  input.onchange = async () => {
    loadFileByInput(input);
    if (onchange) {
      onchange(...(await loadFileByInput(input)));
    }
  };

  box.onclick = () => input.click();
  box.append(input);
  return box;
}

//前端读取本地文件的内容   下面代码中的this.result即为获取到的内容
function loadFileByInput(input: HTMLInputElement): Promise<[string, string]> {
  return new Promise((res) => {
    //支持chrome IE10
    if (window.FileReader) {
      if (input.files) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          res([this.result as any, file.name]);
        };
        reader.readAsText(file);
      }
    } else {
      res(["", ""]);
    }
  });
}

const localfile = {
  download,
  loadFile,
};

export default localfile;
