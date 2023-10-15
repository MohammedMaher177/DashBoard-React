import React from "react";
import { Badge, Calendar } from "antd";
import { getListData } from "../data/dummy.js";
import styles from "./Calendar.module.css"
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const CalendarComp = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className={`notes-month`}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      // <ul className='events'>
      //   {listData.map((item) => (
      //     <li key={item.content} className={`bg-${item.type}`}>
      //       <Badge status={item.type} text={item.content} />
      //     </li>
      //   ))}
      // </ul>
      <div className={`events bg-${listData.type}`}>
        <Badge status={listData.type} text={listData.content} />
      </div>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    console.log(info);
    return info.originNode;
  };
  return(<>
   <Calendar cellRender={cellRender} className={styles.Calendar}/>
  </>)
};
export default CalendarComp;
