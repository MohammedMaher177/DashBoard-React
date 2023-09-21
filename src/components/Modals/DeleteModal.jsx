import { Button, notification } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../store/slices/categoriesSlice/CategoriesActions.js";
import { LoadingOutlined } from "@ant-design/icons";

export default function DeleteModal({ id }) {
  const { loading, error, msg } = useSelector(({ categories }) => categories);

  const dispatch = useDispatch();
  const handleDelete = async () => {
    notification.open({
        message:"Loading.....",
        icon:<LoadingOutlined />
    })
   const { payload} = await dispatch(deleteCategory(id));
    notification.destroy()
    console.log( payload);
    if (
      !loading["categories/deleteCategory"] &&
      payload.error
    ) {
      notification.error({
        message: msg,
        description: payload.error,
      });
    } else if (
      !loading["categories/deleteCategory"] &&
      !payload.error
    ) {
      notification.success({
        message: "Category Deleted",
        description: "The category has been successfully deleted.",
      });
    }
  };
  return (
    <div>
      <Button type="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
