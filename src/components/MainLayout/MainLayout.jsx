import React from "react";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <>
      <div className="container py-5">
        <h1>555555</h1>
        <Outlet></Outlet>
      </div>
    </>
  );
}
