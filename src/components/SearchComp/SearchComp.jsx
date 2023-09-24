import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import AddProduct from "../Modals/AddProduct.jsx";

export const GetColumnSearchProps = (
  dataIndex,
  searchInput,
  handleSearch,
  handleReset,
  setSearchText,
  setSearchedColumn,
  searchedColumn,
  searchText
) => ({
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
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

export const getProductData = (
  searchInput,
  handleSearch,
  handleReset,
  setSearchText,
  setSearchedColumn,
  searchedColumn,
  searchText,
  handleEdit,
  handleDelete
) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...GetColumnSearchProps(
        "name",
        searchInput,
        handleSearch,
        handleReset,
        setSearchText,
        setSearchedColumn,
        searchedColumn,
        searchText
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      ...GetColumnSearchProps(
        "slug",
        searchInput,
        handleSearch,
        handleReset,
        setSearchText,
        setSearchedColumn,
        searchedColumn,
        searchText
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...GetColumnSearchProps(
        "description",
        searchInput,
        handleSearch,
        handleReset,
        setSearchText,
        setSearchedColumn,
        searchedColumn,
        searchText
      ),
      sorter: (a, b) => a.slug.localeCompare(b.slug),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Quantity",
      dataIndex: "totalAmount",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image Cover",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        logo?.secure_url && <img
        src={logo.secure_url}
        alt="Cover"
        style={{ width: "100px", height: "100px" }}
      />
      ),
    },
    // {
    //   title: "Images",
    //   dataIndex: "images",
    //   key: "images",
    //   render: (images) => (
    //     <div>
    //       {images.map((image, index) => (
    //         <img
    //           key={index}
    //           src={image}
    //           alt={`Image_${index + 1}`}
    //           style={{ width: "50px", height: "50px", marginRight: "5px" }}
    //         />
    //       ))}
    //     </div>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      
      render: (row) => (
        <Space size="middle">
          <span
            // type="primary"
            icon={<EditOutlined />}
            // loading={false}
            onClick={() => handleEdit(row._id)}
          >
            <AddProduct Doc={row} Title="Edit" icon={<EditOutlined />}/>
          </span>
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={false}
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
};
