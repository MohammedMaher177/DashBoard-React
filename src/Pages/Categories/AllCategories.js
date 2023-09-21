import React, { useEffect, useRef, useState } from "react";
import { Typography, Table, Button, Space, Input, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categoriesSlice/CategoriesActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../components/Modals/UpdateModal.jsx";
import DeleteModal from "../../components/Modals/DeleteModal.jsx";
import AddCategory from "../../components/Modals/AddCategory.js";

const AllCategories = () => {
  const { categories, loading } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Category ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      ...getColumnSearchProps("slug"),
      sorter: (a, b) => a.slug.localeCompare(b.slug),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <Space size="middle">
          <UpdateModal id={row?._id} Doc={row} />
          <DeleteModal id={row?._id} />
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add-category");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const filteredCategories = categories
    ? categories.filter((category) =>
        searchedColumn
          ? getColumnSearchProps(searchedColumn).onFilter(searchText, category)
          : true
      )
    : [];
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div>
      <Typography.Title level={4}>All Categories</Typography.Title>
      {/* <Button
        type="primary"
        style={{ marginBottom: "16px" }}
        onClick={handleAdd}
      >
        Add Category
      </Button> */}
      <AddCategory />

      <Table
        dataSource={paginatedCategories}
        columns={columns}
        loading={
          loading["categories/deleteCategories"] ||
          loading["categories/fetchCategories"] ||
          loading["categories/updateCategory"] ||
          loading["categories/createCategory"]
        }
        pagination={false}
        key={"_id"}
        rowKey={"_id"}
      />
      <br />
      <Pagination
        current={currentPage}
        total={filteredCategories.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllCategories;
