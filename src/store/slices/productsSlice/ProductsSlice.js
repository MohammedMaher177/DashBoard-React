import { createSlice, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import { getRequestNameFromActionType } from "../../../utils";
import {
  fetchProducts,
  fetchProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} from "./ProductsActions";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  products: [],
  productById: {},
  loading: {},
  error: {},
  msg: "",
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.products = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.productById = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading["products/updateProduct"] = false;
        state.productById = action.payload;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.loading["products/addProduct"] = true;
        notification.open({
          message: "Loading.....",
          icon: <LoadingOutlined />,
        });
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        notification.destroy();
        state.loading["products/addProduct"] = false;
        state.msg = action.payload.message;
        state.products.push(action.payload.result);
        notification.success({
          message: "Product Created",
          description: "The Product has been successfully Created.",
        });
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        notification.destroy();
        console.log(payload);
        state.loading["products/addProduct"] = false;
        state.error["products/addProduct"] = payload.errors[0] | payload.error;
        notification.error({
          message: payload.message,
          description: state.error,
        });
      })
      .addCase(deleteProduct.pending, (state, actions) => {
        state.loading["products/deleteProduct"] = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.loading["products/deleteProduct"] = false;
        state.products = state.products.filter(
          (el) => el._id !== payload.result._id
        );
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.loading["products/deleteProduct"] = false;
        state.error["products/deleteProduct"] = payload.result;
      });
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;

// .addMatcher(
//   isAllOf('/products/fetchPending'),
//   (state, action) => {
//     if (action.type.includes("pending")) {
//       const requestName = getRequestNameFromActionType(action?.type, '/pending');
//       if (requestName) {
//         state.loading[requestName] = true;
//         state.error[requestName] = null;
//       }
//     }
//   }
// )
// .addMatcher(
//   isAnyOf('/products/fetchRejected'),
//   (state, action) => {
//     if (action.type.includes("rejected")) {
//       state.loading[getRequestNameFromActionType(action?.type, 'rejected')] = false;
//       state.error[getRequestNameFromActionType(action?.type, 'rejected')] = null;
//     }
//   }
// );
