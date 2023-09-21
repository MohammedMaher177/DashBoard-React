import React, { useEffect, useState } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Input, Space, Modal, Form, Button, Badge, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../store/slices/categoriesSlice/CategoriesActions.js";

const UpdateModal = ({ id, Doc }) => {
  const { error, loading, msg } = useSelector(({ categories }) => categories);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(
    loading["categories/updateCategory"]
  );
  const [updatedData, setUpdatedData] = useState({
    name: Doc?.name,
    description: Doc?.description,
  });
  const dispatch = useDispatch();
  const showModal = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOk = () => {
    dispatch(updateCategory({ id, updatedData }));
    setConfirmLoading(loading["categories/updateCategory"]);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    if (msg === "success" && !error["categories/updateCategory"]) {
      handleCancel();
    } else if (error["categories/updateCategory"]) {
      console.log(error);
      setShow(true);
    }
  };

  useEffect(() => {
    setConfirmLoading(loading["categories/updateCategory"]);
    handleClose();
  }, [loading["categories/updateCategory"]]);
  return (
    <>
      <Button type="primary" key="updateModal" onClick={showModal}>
        Update
      </Button>
      <Modal
        title="Update Category Data"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        key="ModalBody"
      >
        <Divider orientation="center">
          {error["categories/updateCategory"] && (
            <Badge
              count={show ? error["categories/updateCategory"] : 0}
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
          </Space>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateModal;
