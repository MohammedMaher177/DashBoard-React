import React, { useEffect, useState } from "react";
import {
  Input,
  Space,
  Modal,
  Form,
  Button,
  Badge,
  Divider,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/slices/productsSlice/ProductsActions.js";
import UploadImageComp from "../Inputs/UpoadImage.jsx";
import SelectItems from "../Inputs/MultiSelect.jsx";
import { getCategoryNames } from "../../store/slices/categoriesSlice/CategoriesActions.js";

const AddProduct = () => {
  const { error, loading, msg, names } = useSelector(
    ({ categories }) => categories
  );
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(
    loading["categories/addCategory"]
  );

  const [productData, setproductData] = useState({
    name: "",
    description: "",
    price: 0,
    logo: null,
    totalAmount: 0,
    colors: [],
    category: "",
  });

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    console.log(e);
    setproductData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const formData = new FormData();
  const handleOk = async () => {
    console.log(productData.category[0]);
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("logo", productData.logo);
    formData.append("colors[]", JSON.stringify(productData.colors));
    // productData.colors.forEach(el => formData.append("colors[]", el))
    formData.append("category", productData.category[0]);
    formData.append("totalAmount", productData.totalAmount);
    formData.append("price", productData.price);
    console.log(formData.get("colors[]"));
    await dispatch(createProduct(formData));
    if (
      !error["categories/deleteCategory"] &&
      !loading["categories/deleteCategory"]
    ) {
      notification.success({
        message: "Category Created",
        description: "The category has been successfully Created.",
      });
    } else if (
      error["categories/deleteCategory"] &&
      !loading["categories/deleteCategory"]
    ) {
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
    dispatch(getCategoryNames());
  }, []);
  return (
    <>
      <Button type="primary" key="addModal" onClick={showModal}>
        Add Product
      </Button>
      {loading["categories/names"] ? (
        "Loading"
      ) : (
        <Modal
          title="Add new Product"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
          key="ModalBody"
        >
          <Divider orientation="center">
            {error["product/addProduct"] && (
              <Badge
                count={show ? error["product/addProduct"] : 0}
                orientation="center"
                color="dark"
              />
            )}
          </Divider>
          <Form onFinish={handleOk} style={{ width: "100%" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  addonBefore="Name"
                  style={{ width: "100%" }}
                  defaultValue={productData.name}
                  onChange={handleChange}
                  name="name"
                />
              </Space.Compact>
              <Space.Compact size="large" style={{ width: "100%" }}>
                <Input
                  style={{ width: "100%" }}
                  name="description"
                  defaultValue={productData.description}
                  addonBefore={"Desc"}
                  onChange={handleChange}
                />
              </Space.Compact>
              <Space.Compact size="large" style={{ width: "100%" }}>
                <Input
                  style={{ width: "100%" }}
                  name="price"
                  type="number"
                  defaultValue={productData.price}
                  addonBefore={"Price"}
                  onChange={handleChange}
                />
              </Space.Compact>
              <Space.Compact size="large" style={{ width: "100%" }}>
                <Input
                  style={{ width: "100%" }}
                  name="totalAmount"
                  type="number"
                  defaultValue={productData.totalAmount}
                  addonBefore={"Qty"}
                  onChange={handleChange}
                />
              </Space.Compact>
              <Space.Compact size="large" style={{ width: "100%" }}>
                <SelectItems
                  handleChange={handleChange}
                  setproductData={setproductData}
                  name="colors"
                />
              </Space.Compact>
              <Space.Compact size="large" style={{ width: "100%" }}>
                <SelectItems
                  handleChange={handleChange}
                  setproductData={setproductData}
                  name="category"
                  options={[...names]}
                />
              </Space.Compact>
              <UploadImageComp setproductData={setproductData} />
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
      )}
    </>
  );
};
export default AddProduct;
