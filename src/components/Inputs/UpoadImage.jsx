import { Upload } from "antd";
import { useState } from "react";

const UploadImageComp = ({ setproductData }) => {
  const [defaultFileList, setDefaultFileList] = useState(null);

  const uploadImage = async (options) => {
    const { onSuccess, file } = options;

    setproductData((prevFormData) => ({
      ...prevFormData,
      logo: file,
    }));
    onSuccess("Ok");
  };

  const handleOnChange = ({ file }) => {
    setDefaultFileList(file);
  };

  return (
    <div className="container">
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="picture-card"
        defaultFileList={defaultFileList}
        className="image-upload-grid"
        name="logo"
      >
        {defaultFileList ? null : <div>Upload Button</div>}
      </Upload>
    </div>
  );
};
export default UploadImageComp;
