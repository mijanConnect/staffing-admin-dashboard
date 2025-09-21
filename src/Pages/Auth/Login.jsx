import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import image4 from "../../assets/image4.png";
import googleIcon from "../../assets/google-icon.png";
import { useUser } from "../../provider/User";

// ✅ Dummy users
const dummyUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "USER",
  },
  {
    email: "employee@example.com",
    password: "employee123",
    role: "EMPLOYEE",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser } = useUser(); // 👈 use context

  const onFinish = async (values) => {
    const { email, password } = values;

    const foundUser = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    // ✅ Save user in localStorage
    localStorage.setItem("user", JSON.stringify(foundUser));

    // ✅ Update context immediately
    setUser(foundUser);

    // Navigate after login
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="text-center mb-8">
        <img src={image4} alt="logo" className="px-16 mx-auto" />
        {/* <h1 className="text-[25px] font-semibold mb-[10px] mt-[20px]">
          Merchants Dashboard
        </h1> */}
        <p className="mt-6">Welcome back! Please enter your details.</p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label={
            <p
              style={{
                display: "block",
                color: "#5C5C5C",
              }}
              htmlFor="email"
              className="font-semibold "
            >
              Email
            </p>
          }
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          className="custom-form-item"
        >
          <Input
            placeholder="Enter your password"
            style={{
              height: 50,
              border: "1px solid #2C2A5B",
              outline: "none",
              boxShadow: "none",
              borderRadius: "8px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <p
              style={{
                display: "block",
                color: "#5C5C5C",
              }}
              htmlFor="email"
              className="font-semibold "
            >
              Password
            </p>
          }
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 50,
              border: "1px solid #2C2A5B",
              outline: "none",
              boxShadow: "none",
              borderRadius: "8px",
            }}
          />
        </Form.Item>

        {error && (
          <p
            style={{ color: "red", marginBottom: "10px", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            {/* <Checkbox>Remember me</Checkbox> */}
          </Form.Item>

          <a
            className="login-form-forgot text-[#1E1E1E] hover:text-primary rounded-md font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 50,
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
              borderRadius: "8px",
            }}
            className="flex items-center justify-center border border-primary bg-primary hover:bg-white text-white hover:text-primary transition"
          >
            Sign in
          </button>
        </Form.Item>
      </Form>
      {/* <Form.Item style={{ marginBottom: 0 }}>
        <button
          htmlType="submit"
          type="submit"
          style={{
            width: "100%",
            height: 45,
            color: "#1E1E1E",
            fontWeight: "400px",
            fontSize: "18px",
            marginTop: 20,
            borderRadius: "200px",
            border: "1px solid #2C2A5B",
          }}
          className="flex items-center justify-center rounded-lg"
        >
          <img src={googleIcon} alt="Google logo" className="mr-[12px]" />
          Sign in with Google
        </button>
      </Form.Item> */}
      {/* <div className="mt-[20px]">
        <p className="text-center text-[#1E1E1E]">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-primary hover:text-[#1E1E1E] font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div> */}
    </div>
  );
};

export default Login;
