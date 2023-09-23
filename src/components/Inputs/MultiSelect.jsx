import React from "react";
import { Select, Tag } from "antd";
const colors = [
  {
    _id: "gold",
  },
  {
    _id: "lime",
  },
  {
    _id: "green",
  },
  {
    _id: "cyan",
  },
  {
    _id: "black",
  },
];
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"rgb(161, 30, 102)"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
const SelectItems = ({ setproductData, productData, name, options=colors }) => {
  const handleChange = (e) => {
    setproductData((prevFormData) => ({
      ...prevFormData,
      [name]: e,
    }));
  };
  return (
    <Select
      name={name}
      mode="multiple"
      onChange={handleChange}
      tagRender={tagRender}
      defaultValue={[]}
      style={{
        width: "100%",
      }}
      options={options.map(item=>{return{
        value: item._id,
        label: item.name || item._id
      }})}
    />
  );
};
export default SelectItems;
