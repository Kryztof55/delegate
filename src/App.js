import "./App.css";
import React, { useState, useEffect } from "react";
//import CollapseComponent from "./components/collapse/collapseComponent";
import { Row, Col, PageHeader } from "antd";

import TableComponent from "./components/table/tableComponent";
import * as actions from "./actions/actions";
import { useDispatch, useSelector, connect } from "react-redux";
import "antd/dist/antd.css";
import "./scss/customStyles.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("Res", res.data);
        dispatch(actions.setUsers(res.data));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  const users = useSelector((state) => state.usersReducer.users);
  return (
    <React.Fragment>
      <PageHeader
        className="site-page-header"
        title="Delegate"
        subTitle="List of users"
      />
      <Row>
        <Col span={12} offset={6}>
          <TableComponent data={users}></TableComponent>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default App;
