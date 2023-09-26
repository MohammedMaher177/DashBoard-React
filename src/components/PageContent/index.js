import { Outlet } from "react-router-dom";
import styles from "./pagecontent.module.css";
import { Layout } from "antd";
import { useState } from "react";
import SideMenu from "../SideMenu/index.js";
import Footer from "../Footer/index.js";
import Header from "../Header/index.js";

const { Sider } = Layout;
const PageContent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={styles.pagecontent}>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
          }}
          className={styles.sider}
        >
          <div className="demo-logo-horizontal" />
          <SideMenu />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Layout>
            <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          </Layout>
          <Layout>
            <Outlet />
          </Layout>
          <Layout>
            <Footer collapsed={collapsed}/>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageContent;
