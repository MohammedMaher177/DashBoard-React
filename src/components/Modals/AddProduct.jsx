import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { createProduct, updateProduct } from "../../store/slices/productsSlice/ProductsActions.js";
import UploadImageComp from "../Inputs/UpoadImage.jsx";
import SelectItems from "../Inputs/MultiSelect.jsx";
import { getCategoryNames } from "../../store/slices/categoriesSlice/CategoriesActions.js";

const AddProduct = ({ Doc, Title = "Add Product", icon }) => {
  const dispatch = useDispatch();
  const formData = new FormData();
  const { names } = useSelector(({ categories }) => categories);
  const { error, loading, msg } = useSelector(({ products }) => products);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(
    loading["categories/addCategory"]
  );

  const [productData, setproductData] = useState({
    name: Doc?.name || "",
    description: Doc?.description || "",
    price: Doc?.price || null,
    logo: Doc?.logo.secure_url || null,
    totalAmount: Doc?.totalAmount || null,
    colors: Doc?.colors || [],
    category: Doc?.category.name || null,
  });

  const setFormData = () => {
    formData.append("name", productData?.name);
    formData.append("description", productData?.description);
    formData.append("logo", productData?.logo);
    formData.append("colors[]", JSON.stringify(productData?.colors));
    formData.append("category", productData?.category);
    formData.append("totalAmount", productData?.totalAmount);
    formData.append("price", productData?.price);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    totalAmount: Yup.number().required(),
    colors: Yup.array(),
    category: Yup.string(),
  });

  const handleOk = async () => {
    setConfirmLoading(true);
    setFormData();
    console.log(formData.get("logo"));
    const  {payload, type}  = await dispatch(Doc ? updateProduct({id: Doc._id, updatedData:formData}) : createProduct(formData));
    console.log(payload, type);
    setConfirmLoading(false);
    if (!(payload.error || payload.errors) && !loading[type]) {
      setOpen(false);
    } else if (
      (payload.error || payload.errors) &&
      !loading[type]
    ) {
      notification.error({
        message: msg,
        description: payload.error,
      });
    }
  };

  const formik = useFormik({
    initialValues: productData,
    onSubmit: handleOk,
    validationSchema,
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    console.log(e);
    setproductData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    formik.setValues(productData);
  };

  const handleCancel = () => {
    setproductData({
      name: "",
      description: "",
      price: null,
      logo: null,
      totalAmount: null,
      colors: [],
      category: null,
    });
    setOpen(false);
    console.log(productData);
  };

  useEffect(() => {
    dispatch(getCategoryNames());
  }, []);

  return (
    <>
      <Button type="dashed" key="addModal" icon={icon} onClick={showModal}>
        {Title}
      </Button>
      
      <Modal
        title="Add new Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        key="ModalBody"
        destroyOnClose={true}
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
        {loading["categories/names"] ? (
          <div>Loading</div>
        ) : (
          <Form onFinish={formik.handleSubmit} style={{ width: "100%" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Form.Item rules={[{ max: 50, min: 5, required: true }]}>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    addonBefore="Name"
                    style={{ width: "100%" }}
                    defaultValue={productData?.name}
                    onChange={handleChange}
                    name="name"
                    required
                  />
                </Space.Compact>
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <Space.Compact size="large" style={{ width: "100%" }}>
                  <Input
                    required
                    style={{ width: "100%" }}
                    name="description"
                    defaultValue={productData?.description}
                    addonBefore={"Desc"}
                    onChange={handleChange}
                  />
                </Space.Compact>
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <Space.Compact size="large" style={{ width: "100%" }}>
                  <Input
                    required
                    style={{ width: "100%" }}
                    name="price"
                    type="number"
                    defaultValue={productData?.price}
                    addonBefore={"Price"}
                    onChange={handleChange}
                  />
                </Space.Compact>
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <Space.Compact size="large" style={{ width: "100%" }}>
                  <Input
                    required
                    style={{ width: "100%" }}
                    name="totalAmount"
                    type="number"
                    defaultValue={productData?.totalAmount}
                    addonBefore={"Qty"}
                    onChange={handleChange}
                  />
                </Space.Compact>
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <Space.Compact size="large" style={{ width: "100%" }}>
                  <SelectItems
                    setFieldValue={formik.setFieldValue}
                    multiple={true}
                    handleChange={handleChange}
                    setproductData={setproductData}
                    name="colors"
                    defaultValue={
                      // () =>
                      Doc?.colors.length && JSON.parse([...Doc?.colors])
                      // : false
                    }
                  />
                </Space.Compact>
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <Space.Compact size="large" style={{ width: "100%" }}>
                  <SelectItems
                    setFieldValue={formik.setFieldValue}
                    handleChange={handleChange}
                    setproductData={setproductData}
                    name="category"
                    options={[...names]}
                    defaultValue={productData?.category}
                  />
                </Space.Compact>
              </Form.Item>
              <Form.Item rules={[{ required: true }]}>
                <UploadImageComp
                  setFieldValue={formik.setFieldValue}
                  setproductData={setproductData}
                  image={productData?.logo}
                />
              </Form.Item>
              <Space>
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                  // onClick={handleOk}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Submit
                </Button>
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
              </Space>
            </Space>
          </Form>
        )}
      </Modal>
      
    </>
  );
};
export default AddProduct;

//className={Title.includes("Add") && "mb-2"}