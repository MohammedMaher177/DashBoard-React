import { Upload } from "antd";
import { useState } from "react";

const UploadImageComp = ({ setproductData, image }) => {
  const [defaultFileList, setDefaultFileList] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const uploadImage = async (options) => {
    const { onSuccess, file } = options;
    setproductData((prevFormData) => ({
      ...prevFormData,
      logo: file,
    }));
    onSuccess("Ok");
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleOnChange = ({ file }) => {
    setDefaultFileList(file);
    getBase64(file.originFileObj, (url) => {
      // setLoading(false);
      setImageUrl(url);
  })
};

  return (
    <div className="container">
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        showUploadList={false}
        // listType="picture-card"
        // className="image-upload-grid"
        listType="picture-circle"
        className="avatar-uploader"
        // fileList={defaultFileList}
        defaultFileList={defaultFileList}
        name="logo"
      >
        {defaultFileList || image ? (
          <img
            src={imageUrl || image}
            alt="Image_Cover"
            style={{width: "100%", borderRadius: "50%", height: "100%" }}
          />
        ) : (
          <div>Upload Button</div>
        )}
      </Upload>
    </div>
  );
};
export default UploadImageComp;
