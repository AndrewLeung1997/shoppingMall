import React, { useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Button,
  Checkbox,
  Steps,
  message,
  Divider,
  Space
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

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

const steps = [
  {
    title: "基本資料",
    description: "",
  },
  {
    title: "手機號碼驗證",
    description: "",
  },
  {
    title: "密碼設定",
    description: "",
  },
];

function MultiStepRegistration() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [codeSent, setCodeSent] = useState(false);
  const [codeTimer, setCodeTimer] = useState(0);

  const navigate = useNavigate();

  // 計時器
  React.useEffect(() => {
    let timer;
    if (codeTimer > 0) {
      timer = setTimeout(() => setCodeTimer(codeTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [codeTimer]);

  // 下一步
  const onNext = async () => {
    try {
      await form.validateFields(stepFields[current]);
      setCurrent(current + 1);
    } catch (err) {
      // 錯誤交給 antd 顯示
    }
  };

  // 上一步
  const onPrev = () => setCurrent(current - 1);

  // 發送驗證碼
  const sendCode = () => {
    const phone = form.getFieldValue("phone");
    if (!phone || !/^852\d{8}$/.test(phone)) {
      message.error("請輸入正確的手機號碼");
      return;
    }
    setCodeSent(true);
    setCodeTimer(60);
    message.success(`驗證碼已發送至 ${phone}（模擬）`);
  };

  // 完成註冊
  const onFinish = async () => {
    try {
      await form.validateFields(stepFields[2]);
      const values = form.getFieldsValue();
      message.success(`註冊成功！歡迎，${values.username}`);
      // 可在這裡呼叫API
    } catch (err) {
      // 錯誤交給 antd 顯示
    }
  };

  // 每一步的欄位名稱
  const stepFields = [
    ["username", "email", "tgId"],
    ["phoneNymber", "regcode"],
    ["password", "confirmPassword", "agree"],
  ];

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

        {/* 表單 */}
        <div
          style={{
            width: 370,
            maxWidth: "95vw",
            padding: 32,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 32px #0001",
            zIndex: 1,
            position: "relative",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: theme.token.colorPrimary,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            會員註冊
          </h2>
          <Steps
            size="small"
            current={current}
            style={{ marginBottom: 24, marginTop: 8 }}
            items={steps}
          />
          <Form
            form={form}
            name="multi-step-register"
            layout="vertical"
            autoComplete="off"
            scrollToFirstError
          >
            {/* Step 1 */}
            {current === 0 && (
              <>
                <Form.Item
                  name="username"
                  label="用戶名稱"
                  rules={[
                    { required: true, message: "請輸入用戶名稱" },
                    { min: 2, message: "用戶名稱至少需2個字" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="用戶名稱"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="電子郵件"
                  rules={[
                    { required: true, message: "請輸入電子郵件" },
                    { type: "email", message: "電子郵件格式不正確" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined />}
                    placeholder="電子郵件"
                  />
                </Form.Item>
                <Form.Item
                  name="tgId"
                  label="Telegram ID"
                  rules={[{ required: false }]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Telegram ID"
                  />
                </Form.Item>
              </>
            )}

            {/* Step 2 */}
            {current === 1 && (
              <>
                <Form.Item
                  name="phone"
                  label="手機號碼"
                  rules={[
                    { required: true, message: "請輸入手機號碼" },
                    {
                      pattern: /^09\d{8}$/,
                      message: "手機號碼格式錯誤（09xxxxxxxx）",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MobileOutlined />}
                    placeholder="手機號碼"
                  />
                </Form.Item>
                <Form.Item label="驗證碼" required style={{ marginBottom: 8 }}>
                  <Space.Compact style={{width: "100%"}}>
                    <Form.Item
                      name="regcode"
                      noStyle
                      rules={[
                        { required: true, message: "請輸入驗證碼" },
                        { len: 6, message: "驗證碼為6碼" },
                      ]}
                    >
                      <Input
                        size="large"
                        prefix={<SafetyCertificateOutlined />}
                        placeholder="請輸入驗證碼"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                    <Button
                      size="large"
                      disabled={codeTimer > 0}
                      onClick={sendCode}
                      style={{
                        width: "38%",
                        marginLeft: "2%",
                        background:
                          codeTimer > 0 ? "#eee" : theme.token.colorPrimary,
                        color: codeTimer > 0 ? "#999" : "#fff",
                        border: "none",
                        fontWeight: 500,
                      }}
                    >
                      {codeTimer > 0 ? `重新發送(${codeTimer})` : "發送驗證碼"}
                    </Button>
                  </Space.Compact>
                </Form.Item>
              </>
            )}

            {/* Step 3 */}
            {current === 2 && (
              <>
                <Form.Item
                  name="password"
                  label="密碼"
                  rules={[
                    { required: true, message: "請輸入密碼" },
                    { min: 6, message: "密碼至少需6位數" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="密碼"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="確認密碼"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "請再次輸入密碼" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("兩次密碼輸入不一致!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="確認密碼"
                  />
                </Form.Item>
                <Divider style={{ margin: "12px 0" }} />
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("請確認資料隱私與安全政策")
                            ),
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox>
                    我已閱讀並同意{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      資料隱私與安全政策
                    </a>
                  </Checkbox>
                </Form.Item>
              </>
            )}
            {/* Navigation Buttons */}
            <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {current > 0 && (
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={onPrev}
                    size="large"
                    style={{
                      color: theme.token.colorPrimary,
                      borderColor: theme.token.colorPrimary,
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    上一步
                  </Button>
                )}
                {current < 2 && (
                  <Button
                    type="primary"
                    onClick={onNext}
                    size="large"
                    style={{ flex: 1 }}
                  >
                    下一步
                  </Button>
                )}
                {current === 2 && (
                  <Button
                    type="primary"
                    onClick={onFinish}
                    size="large"
                    style={{ flex: 1 }}
                  >
                    完成註冊
                  </Button>
                )}
              </div>
            </Form.Item>
            <Form.Item style={{ marginTop: 12, marginBottom: 0 }}>
              <Button
                type="link"
                block
                size="large"
                style={{
                  color: theme.token.colorPrimary,
                  fontWeight: 500,
                  padding: 0,
                }}
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/login")}
              >
                返回登入
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default MultiStepRegistration;
