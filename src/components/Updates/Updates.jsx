import React from "react";
import { useStateContext } from "../../context/ContextProvider.js";
import { SparklineAreaData, ecomPieChartData } from "../../Pages/data/dummy.js";
import SparkLine from "../Charts/SparkLine.jsx";
import Pie from "../Charts/Pie.jsx";
import { Col, Row } from "antd";
import MDBox from "../MDBox/index.js";
export default function Updates() {
  const { currentColor, currentMode } = useStateContext();
  return (
    <>
      <Row>
        <Col md={24} sm={24} lg={12} align="center">
          <MDBox>
            <div
              className=" rounded-2xl md:w-400 p-4 m-3"
              style={{ backgroundColor: currentColor }}
            >
              <div className="flex justify-between items-center ">
                <p className="font-semibold text-white text-2xl">Earnings</p>

                <div>
                  <p className="text-2xl text-white font-semibold mt-8">
                    $63,448.78
                  </p>
                  <p className="text-gray-200">Monthly revenue</p>
                </div>
              </div>

              <div className="mt-4">
                <SparkLine
                  currentColor={currentColor}
                  id="column-sparkLine"
                  height="100px"
                  type="Column"
                  data={SparklineAreaData}
                  width="320"
                  color="rgb(242, 252, 253)"
                />
              </div>
            </div>
          </MDBox>
        </Col>
        <Col md={24} sm={24} lg={12} align="center">
          <MDBox>
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>
            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </MDBox>
        </Col>
      </Row>
    </>
  );
}
