import React, { useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Divider,
} from "antd";
import { GoogleOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // 這裡引入 useNavigate
import { signIn } from "./login";

const theme = {
  token: {
    colorPrimary: "#13c2c2",
    borderRadius: 10,
    fontFamily: "Microsoft JhengHei, Arial, sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#13c2c2",
      colorPrimaryHover: "#36cfc9",
    },
  },
};

const handleGoogleSignIn = () => {
  // 在這裡串接 Google OAuth 或跳轉
  message.info("Google 登入流程在此觸發");
};

const googleBtnStyle = {
  background: "#fff",
  color: "#444",
  border: "1px solid #ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 500,
  fontSize: 16,
  boxShadow: "0 1px 2px #0001",
};

const googleIconStyle = {
  fontSize: 22,
  marginRight: 8,
  color: "#EA4335",
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // <-- loading 狀態

  const onFinish = async (values, loading) => {
    //message.success(`登入成功！帳號：${values.username}`);
    try {
      setLoading(true);
      let email = values.email;
      let password = values.password;
      console.log(email);
      const res = await signIn({ email, password });
      const { token } = res.data;
      sessionStorage.setItem("access_token", token);
    } catch (e) {
      let errorMessage = "登入失敗，請稍後再試";

      if (e.isAxiosError && e.response?.data?.message) {
        errorMessage = e.response.data.message;
      }

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("請完整填寫表單");
  };

  return (
    <ConfigProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: "#f0f2f5",
          overflow: "hidden",
        }}
      >
        {/* 背景圓圈 */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle at 60% 40%, #13c2c230 70%, transparent 100%)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "240px",
            height: "240px",
            background:
              "radial-gradient(circle at 40% 60%, #36cfc950 60%, transparent 100%)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
            background:
              "radial-gradient(circle at 70% 30%, #13c2c220 70%, transparent 100%)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* 登入表單 */}
        <Form
          name="login"
          style={{
            width: 340,
            padding: 32,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 32px #0001",
            zIndex: 1,
            position: "relative",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h2
            style={{
              textAlign: "center",
              color: theme.token.colorPrimary,
              marginBottom: 24,
              fontWeight: 700,
            }}
          >
            會員登入
          </h2>
          <Button
            block
            size="large"
            style={googleBtnStyle}
            icon={<GoogleOutlined style={googleIconStyle} />}
            onClick={handleGoogleSignIn}
          >
            使用 Google 登入
          </Button>
          <Divider plain>或</Divider>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "請輸入電子郵件賬號" }]}
          >
            <Input size="large" placeholder="電子郵件" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "請輸入密碼" }]}
          >
            <Input.Password
              size="large"
              placeholder="密碼"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox>記住我</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginTop: 30, marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading} // <-- loading 屬性
              disabled={loading}
            >
              {" "}
              {loading ? "登入中..." : "登入賬號"}
            </Button>
          </Form.Item>
          <Form.Item style={{ marginTop: 10, marginBottom: 0 }}>
            <Button
              type="default"
              size="large"
              block
              icon={<UserAddOutlined />}
              style={{
                color: theme.token.colorPrimary,
                borderColor: theme.token.colorPrimary,
                fontWeight: 500,
              }}
              onClick={() => navigate("/register")}
            >
              註冊新帳號
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default Login;
