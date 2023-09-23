import React, { useEffect, useState } from "react";
import { Form, Input, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/loginSlice/LoginAction";
import styles from "./login.module.css";
// import logo from '/logo.png'
import { LoadingOutlined } from "@ant-design/icons";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, message, loading } = useSelector((state) => {
    return state.login;
  });

  const dispatch = useDispatch();
  const handleNavigate = () => {
    if (message === "success" && !error) {
      navigate("/dashboard");
    }
  };

  const onFinish = async () => {
    try {
      // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      // if (!emailPattern.test(email)) {
      //   alert("Please enter a valid email address.");
      //   return;
      // }
      await dispatch(loginUser({ email, password }));
      console.log({ error, message, loading });
      //
    } catch (error) {
      alert("invalid email or password");
      console.error(error);
    }
  };
  useEffect(() => {
    handleNavigate();
  }, [message]);
  return (
    <>
      <div className={styles.bgImage}></div>
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          className={styles.logo}
        />
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <label className={styles.labels}>Email</label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <label className={styles.labels}>Password</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <div style={{position: "relative"}}>
            {error && <div className={styles.error}>{error}</div>}
            </div>
          <Form.Item style={{marginTop: "50px"}}>
            {!loading ? (
              <Button type="primary" htmlType="submit" className={styles.btn}>
                Log in
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" className={styles.btn}>
                <LoadingOutlined />
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
    </>
  );
};

export default Login;
