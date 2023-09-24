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
  const { label, closable, onClose } = props;
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
const SelectItems = ({
  setproductData,
  name,
  options = colors,
  defaultValue,
  multiple = false,
  setFieldValue
}) => {
  // console.log((defaultValue));
  const handleChange = (e) => {
    setproductData((prevFormData) => ({
      ...prevFormData,
      [name]: e,
    }));
    setFieldValue(name, e)
  };
  return (
    <Select
      defaultValue={defaultValue ? defaultValue :  []}
      // defaultValue={[]}
      name={name}
      mode={multiple ? "multiple" : false}
      onChange={handleChange}
      tagRender={tagRender}
      style={{
        width: "100%",
      }}
      options={options.map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })}
      // options={{list : options, value: "_id", label : "name"}}
    />
  );
};
export default SelectItems;
