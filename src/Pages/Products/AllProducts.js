import React, { useEffect, useRef, useState } from "react";
import {Typography,Table,Pagination} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts,deleteProduct,} from "../../store/slices/productsSlice/ProductsActions";
import AddProduct from "../../components/Modals/AddProduct.jsx";
import {GetColumnSearchProps, getProductData } from "../../components/SearchComp/SearchComp.jsx";

const AllProducts = () => {
  const { products, loading } = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleEdit = (id) => {
    console.log(id);
    <AddProduct />
  };

  const handleDelete = async (productId) => {
    dispatch(deleteProduct(productId))
  };


  const columns = getProductData(
    searchInput,
    handleSearch,
    handleReset,
    setSearchText,
    setSearchedColumn,
    searchedColumn,
    searchText,
    handleEdit,
    handleDelete
  );


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const filteredProducts = products
    ? products.filter((product) =>
        searchedColumn
          ? GetColumnSearchProps(
              searchedColumn,
              searchInput,
              handleSearch,
              handleReset,
              setSearchText,
              setSearchedColumn,
              searchedColumn,
              searchText
            ).onFilter(searchText, product)
          : true
      )
    : [];

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <Typography.Title level={4}>All Products</Typography.Title>
      <AddProduct />
      <Table
      // virtual scroll={{ x: 200, y: 500 }} 
      rowKey="_id"
        dataSource={paginatedProducts}
        columns={columns}
        loading={
          loading["products/deleteProduct"] ||
          loading["products/fetchProducts"] ||
          loading["products/updateProduct"] ||
          loading["products/addProduct"]
        }
        pagination={false}
      />
      <br />
      <Pagination
        current={currentPage}
        total={filteredProducts.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllProducts;
