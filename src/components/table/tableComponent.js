import React, { useState } from "react";
import { Table, Modal, Input, Space, Avatar, Image, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/actions";

const TableComponent = (props) => {
  const [indexRow, setIndexRow] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 50,
  });

  const { data } = props;
  const users = useSelector((state) => state.usersReducer.users);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const columns = [
    {
      title: "Firt Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (item) => {
    const user = {
      id: userId,
      email: userEmail,
      first_name: userName,
      last_name: userLastName,
      avatar: userAvatar,
    };
    users[indexRow] = user;
    dispatch(actions.setUsers(users));

    fetch(`https://reqres.in/api/users/${item}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        setShowAlert(true);
      })
      .catch((error) => {
        setShowError(true);
      });
    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeInput = (e, type) => {
    let inputValue = e.target.value;
    switch (type) {
      case "name":
        setUserName(inputValue);
        break;
      case "lastName":
        setUserLastName(inputValue);
        break;
      case "email":
        setUserEmail(inputValue);
        break;

      default:
        setUserName("");
        setUserLastName("");
        setUserEmail("");
    }
  };

  const handleTableChange = (item) => {
    setPagination(item);
    fetch(`https://reqres.in/api/users?page=${item.current}`, {
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
        console.log("Respuesta", res.data);
        dispatch(actions.setUsers(res.data));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <React.Fragment>
      <Table
        onRow={(data, rowIndex) => {
          return {
            onClick: (event) => {
              setShowError(false);
              setShowAlert(false);
              showModal();
              setUserId(data.id);
              setUserEmail(data.email);
              setUserName(data.first_name);
              setUserLastName(data.last_name);
              setUserAvatar(data.avatar);
              setIndexRow(rowIndex);
            },
          };
        }}
        dataSource={data}
        columns={columns}
        rowKey={(data) => data.id}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title={`${userName} ${userLastName}`}
        visible={isModalVisible}
        onOk={() => handleOk(userId)}
        onCancel={handleCancel}
        okText="Update"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Avatar size="large" src={<Image src={userAvatar} />} />
          <Input
            onChange={(e) => onChangeInput(e, "name")}
            value={userName}
            placeholder="Name"
          />
          <Input
            onChange={(e) => onChangeInput(e, "lastName")}
            value={userLastName}
            placeholder="Last Name"
          />
          <Input
            onChange={(e) => onChangeInput(e, "email")}
            value={userEmail}
            placeholder="Email"
          />
          {showAlert && (
            <Alert message="User Updated" type="success" showIcon />
          )}
          {showError && (
            <Alert type="error" message="Error to Update the User" banner />
          )}
        </Space>
      </Modal>
    </React.Fragment>
  );
};
export default TableComponent;
