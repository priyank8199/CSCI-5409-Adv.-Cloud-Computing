import { useEffect, useState } from 'react';
import { Button, Form, Input, Layout, theme } from 'antd';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import Navbar from "./header";

const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [fields, setFields] = useState({
    email: null,
    password: null,
  });

  const handleChange = (e, field) => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    axios
    .post("http://localhost:5000/api/users/login", {
     fields
    })
    .then((response) => {
      console.log(response.data.id);
      localStorage.setItem('id', response.data.id);
      const iid = localStorage.getItem('id');
      console.log(iid);
      navigate(`/users`);
    })
    .catch((error) => {
      if (error.response.status === 400 || error.response.status === 401) {
        setError(alert(error.response.data.message));
      } else {
        setError("Something went wrong! Please try again");
      }
    });
  };


  return (
    <Layout>
      <Navbar/>
      <Content>
        <div className="login-page">
          <div className="login-box">
            <div className="illustration-wrapper" style={{ background: '#fff' }}>

              <img
                src="https://media.istockphoto.com/id/1130968476/vector/two-cinema-tickets-on-white-background-movie-tickets-template-in-black-and-red-colors.jpg?s=612x612&w=0&k=20&c=90Xm0S2dUweBZGJbE6k66DwRbccDeSYKoabiabyLZLk="
                alt="Login"
              />
            </div>
            <Form
              className="login-form"
              name="login-form"
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <p className="form-title">Login</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                }}
              >
                <p></p>
              </div>
              <Form.Item
                className=""
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not a valid email!',
                  },
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter your Email"
                  value={fields.email}
                  onChange={e => handleChange(e, 'email')}
                  autoComplete="new-password"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: 'Password must be atleast 8 characters long with one upper case, one lower case, one digit and one special character.',
                  }
                ]}
                style={{height:"48px"}}
              >
                {' '}
                <Input.Password
                  placeholder="Enter your Password"
                  value={fields.password}
                  onChange={e => handleChange(e, 'password')}
                  autoComplete="new-password"
                  className="custom-input"
                  style={{height:"48px"}}
                />
              </Form.Item>
              <Form.Item>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    marginTop: '30px',
                  }}
                >
                  <p>
                    Don't have an account yet? <a href="/register">Sign Up</a>
                  </p>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  className="login-form-button"
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                >

                  Log In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
export default Login;
