import React, { useEffect, useState } from "react";
import {Input,Space,Modal,Form,Button,Badge,Divider,Upload,message, notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { createCategory } from "../../store/slices/categoriesSlice/CategoriesActions.js";

const AddCategory = () => {
  const { error, loading, msg } = useSelector(({ categories }) => categories);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(
    loading["categories/addCategory"]
  );
  const [logo, setlogo] = useState("");
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    logo:{},
  });

  const dispatch = useDispatch();

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    console.log(isJpgOrPng, isLt2M);
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const showModal = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    if (e.file) {
      if (e.file.status === "uploading") {
        setLoadingImg(true);
        return;
      }
      if (e.file.status === "done") {
        setUpdatedData((prevFormData) => ({
            ...prevFormData,
            logo: {
                public_id:e.file.response.public_id,
                secure_url: e.file.response.secure_url
            },
          }))
          setlogo(e.file.response.secure_url)
          setLoadingImg(false);
      }
      return;
    }
    setUpdatedData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOk = async () => {
    setConfirmLoading(loading["categories/addCategory"]);
    await dispatch(createCategory(updatedData));
    // setOpen(false)
    console.log({ error, loading, msg });
    if(!error["categories/deleteCategory"] && !loading["categories/deleteCategory"]){
        notification.success({
            message: "Category Created",
            description: "The category has been successfully Created.",
        });
    }else if(error["categories/deleteCategory"] && !loading["categories/deleteCategory"]){
        notification.error({
            message: "msg",
            description: "payload.error",
          });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    if (msg === "success" && !error["categories/addCategory"]) {
      handleCancel();
    } else if (error["categories/addCategory"]) {
    //   console.log(error);
      setShow(true);
    }
  };

  useEffect(() => {
    setConfirmLoading(loading["categories/addCategory"]);
    handleClose();
  }, [loading["categories/addCategory"]]);
  return (
    <>
      <Button type="primary" key="addModal" onClick={showModal}>
        Add Category
      </Button>
      <Modal
        title="Add new Category"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        key="ModalBody"
      >
        <Divider orientation="center">
          {error["categories/addCategory"] && (
            <Badge
              count={show ? error["categories/addCategory"] : 0}
              orientation="center"
              color="dark"
            />
          )}
        </Divider>
        <Form onFinish={handleOk} style={{ width: "100%" }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                addonBefore="Category"
                style={{ width: "100%" }}
                defaultValue={updatedData.name}
                onChange={handleChange}
                name="name"
              />
            </Space.Compact>
            <Space.Compact size="large" style={{ width: "100%" }}>
              <Input
                style={{ width: "100%" }}
                name="description"
                defaultValue={updatedData.description}
                addonBefore={"Description"}
                onChange={handleChange}
              />
            </Space.Compact>
            <Space>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={confirmLoading}
                onClick={handleOk}
              >
                Submit
              </Button>
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
            <Upload
              name="logo"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://be-dashboard.onrender.com/api/v1/categories/addPhoto"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {logo ? (
                <img
                  src={logo}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
export default AddCategory;
