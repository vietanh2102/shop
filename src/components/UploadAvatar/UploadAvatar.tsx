import { PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { userApiPrivate } from "../../axios/userApi";
import { UploadRequestOption } from "rc-upload/lib/interface";

interface Props {
  getUser: () => Promise<void>;
}
function UploadAvatar({ getUser }: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChangeAvatar: UploadProps["onChange"] = (info) => {
    const { file } = info;
    if (file.status === "uploading") {
      message.loading("Uploading...");
    } else if (file.status === "done") {
      message.success(`${file.name} đã tải lên thành công!`);
    } else if (file.status === "error") {
      message.error(`${file.name} tải lên thất bại.`);
    }
    setFileList([...info.fileList]);
  };
  const customUploadAvatar = async ({
    file,
    onSuccess,
    onError,
  }: UploadRequestOption) => {
    const formData = new FormData();
    formData.append("image", file as Blob);
    await userApiPrivate
      .post("user/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        const url = "https://api-ecom.duthanhduoc.com/images/" + res.data.data;
        await userApiPrivate
          .put("user", { avatar: url })
          .then((res) => {
            if (onSuccess) {
              onSuccess(res.data, file);
            }
            getUser();
          })
          .catch((res) => {
            const messageRes = Object.values(res.response.data.data).toString();
            message.error(messageRes);
          });
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  };
  const uploadButton = (
    <button type="button">
      <PlusOutlined />
      <div className="mt-2">Change Avatar</div>
    </button>
  );
  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onChange={handleChangeAvatar}
        customRequest={customUploadAvatar}
      >
        {uploadButton}
      </Upload>
    </>
  );
}

export default UploadAvatar;
