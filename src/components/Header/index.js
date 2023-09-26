import { Badge, Space, Typography, Button } from "antd";
import {
  MailOutlined,
  BellFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/loginSlice/LoginSlice.js";
const Header = ({ collapsed, toggleCollapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className={styles.header}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <>
        {/* {collapsed && ( */}
          <>
            <Typography.Title className={styles.title}>
              Mohammed's Dashboard
            </Typography.Title>

            <Space>
              <Badge onClick={handleLogoutClick}>
                Logout
                <LogoutOutlined className={styles.icons} />
              </Badge>
              <Badge count={10} dot>
                <MailOutlined className={styles.icons} />
              </Badge>
              <Badge count={20}>
                <BellFilled className={styles.icons} />
              </Badge>
            </Space>
          </>
        {/* )} */}
      </>
    </div>
  );
};
export default Header;
