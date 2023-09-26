import {
  BookOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import StaticCard from "../StaticCard/index.js";
import { Col, Row } from "antd";
import ReportsBarChart from "../ReportsBarChart/index.js";
import MDBox from "../MDBox/index.js";
import ReportsLineChart from "../ReportsLineChart/index.js";

function Main() {
  const sales = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Mobile apps",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  };
  const tasks = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Desktop apps",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  };
  return (
    <>
      <Row>
        <Col md={24} sm={24} lg={12} align="center">
          <MDBox>
            <StaticCard
              color="linear-gradient(195deg, #42424a, #191919)"
              icon={<BookOutlined />}
              title="Bookings"
              count={281}
              percentage={{
                color: "success",
                amount: "+55%",
                label: "than lask week",
              }}
            />
          </MDBox>
        </Col>
        <Col md={24} sm={24} lg={12} align="center">
          <StaticCard
            color="linear-gradient(195deg, #49a3f1, #1A73E8)"
            icon={<DashboardOutlined />}
            title="Today's Users"
            count="2,300"
            percentage={{
              color: "success",
              amount: "+3%",
              label: "than last month",
            }}
          />
        </Col>
        <Col md={24} sm={24} lg={12} align="center">
          <StaticCard
            color="linear-gradient(195deg, #66BB6A, #43A047)"
            icon={<AppstoreAddOutlined />}
            title="Revenue"
            count="34k"
            percentage={{
              color: "success",
              amount: "+1%",
              label: "than yesterday",
            }}
          />
        </Col>
        <Col md={24} sm={24} lg={12} align="center">
          <StaticCard
            color="linear-gradient(195deg, #EC407A, #D81B60"
            icon={<UsergroupAddOutlined />}
            title="Followers"
            count="+91"
            percentage={{
              color: "success",
              amount: "55%5",
              label: "Just updated",
            }}
          />
        </Col>
      </Row>
      <Row gutter={15} align="center">
        <Col md={24} sm={24} lg={7} align="center">
          <MDBox>
            <ReportsBarChart
              color="info"
              title="website views"
              description="Last Campaign Performance"
              date="campaign sent 2 days ago"
              chart={{
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: {
                  label: "Sales",
                  data: [50, 20, 10, 22, 50, 10, 40],
                },
              }}
            />
          </MDBox>
        </Col>
        <Col md={24} sm={24} lg={7} align="center">
          <MDBox mb={3}>
            <ReportsLineChart
              color="success"
              title="daily sales"
              description={
                <>
                  (<strong>+15%</strong>) increase in today sales.
                </>
              }
              date="updated 4 min ago"
              chart={sales}
            />
          </MDBox>
        </Col>
        <Col md={24} sm={24} lg={7} align="center">
          <MDBox mb={3}>
            <ReportsLineChart
              color="dark"
              title="completed tasks"
              description="Last Campaign Performance"
              date="just updated"
              chart={tasks}
            />
          </MDBox>
        </Col>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </>
  );
}

export default Main;
