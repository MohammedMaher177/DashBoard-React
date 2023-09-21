import React, { useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../store/slices/categoriesSlice/CategoriesActions.js";
import { AntDesignOutlined } from "@ant-design/icons";
const Test = ({ id, Doc }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState(Doc);
  const [modalText, setModalText] = useState("Content of the modal");
  const dispatch = useDispatch();
  console.log(id, Doc);
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
    console.log(id);
    dispatch(updateCategory({ id, updatedData }));
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Update Category Data"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk} style={{ width: "100%" }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space.Compact style={{ width: "100%" }}>
                
              <Input
                addonBefore="Category"
                
                style={{ width: "100%" }}
                defaultValue={Doc.name}
                onChange={handleChange}
                name="name"
              />
            </Space.Compact>
            <Space.Compact size="large" style={{ width: "100%" }}>
              <Input
              style={{ width: "100%" }}
                name="description"
                defaultValue={Doc.description}
                addonBefore={[<AntDesignOutlined />, " Description"]}
                placeholder="Discreption"
                onChange={handleChange}
              />
            </Space.Compact>
            <Space >
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

export default Test;
