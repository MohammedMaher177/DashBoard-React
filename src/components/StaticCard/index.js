import React from "react";
import { Card } from "antd";
import styles from "./StaticCard.module.css";
const StaticCard = ({ icon, title, count, percentage, color }) => (
  <div className={styles.card_container}>
    <Card
      icon={icon}
      title={title}
      bordered={false}
      
    >
      <i className={`${styles.icon}`} style={{ background: color }}>
        {icon}
      </i>
      <p className={styles.count}>{count}</p>
      <p>
        <span className={`text-${percentage.color} fs-4 fw-bolder`}>{percentage.amount}</span>{" "}
        {percentage.label}
      </p>
    </Card>
  </div>
);
export default StaticCard;
