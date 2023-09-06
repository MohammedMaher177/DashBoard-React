import React, { useEffect, useState } from 'react';
import { Form, Button, Input } from 'antd';
import styles from './style.module.css'

const CommonProductForm = ({ onFinish, isEditing, initialValues }) => {
  const initialFormValues = initialValues || {};
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initialValues) {
      setImageCover(initialValues.imageCover || null);
      setImages(initialValues.images || []);
    }
  }, [initialValues]);
  

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('slug', values.slug);
    formData.append('description', values.description);
    formData.append('quantity', values.quantity);
    formData.append('price', values.price);

    if (imageCover || (isEditing && initialValues.imageCover)) {
      formData.append('imageCover', imageCover || initialValues.imageCover);
    }

    if (images.length > 0 || (isEditing && initialValues.images)) {
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    onFinish(formData);
  };

  return (
    <div className={styles.formContainer}>
    <Form
      name={isEditing ? 'editProduct' : 'addProduct'}
      onFinish={handleSubmit}
      layout="horizontal"
      initialValues={initialFormValues}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input the title',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please input the slug',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input the description',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: 'Please input the quantity',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input the price',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Image Cover">
  {isEditing && initialValues.imageCover && (
    <img
      src={initialValues.imageCover}
      alt="Image Cover"
      style={{ maxWidth: '100px', maxHeight: '100px' }}
    />
  )}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageCover(e.target.files[0])}
  />
</Form.Item>

<Form.Item label="Images">
  {isEditing &&
    initialValues.images &&
    initialValues.images.map((imageUrl, index) => (
      <img
        key={index}
        src={imageUrl}
        alt={`Image ${index + 1}`}
        style={{
          maxWidth: '50px',
          maxHeight: '50px',
          marginRight: '5px',
        }}
      />
    ))}
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => setImages([...images, ...e.target.files])}
  />
</Form.Item>

      <Form.Item
       wrapperCol={{
        offset: 8,
        span: 16,
      }}
      >
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CommonProductForm;
