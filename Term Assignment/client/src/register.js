import { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Form, Input, Layout, theme } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

const { Content } = Layout;

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [fields, setFields] = useState({
    name: null,
    email: null,
    city: null,
    password: null,
    confirmPassword: null,
  });

  const handleChange = (e, field) => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    axios
    .post("http://localhost:5000/api/users/register", {
     fields
    })
    .then((response) => {
      navigate(`/login`);
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
      {/*<GlobalHeader title={'Products'} />*/}
      <Content>
        <div className="register-page">
          <div className="register-box">
            <div className="illustration-wrapper" style={{ background: '#fff' }}>
              <img
                src="https://media.istockphoto.com/id/1177049680/vector/movie-tickets-vector-cinema-ticket-design.jpg?s=612x612&w=0&k=20&c=6gZIUIPsNas6jCs-Vh3SeX7kTu6zGFUEVZDLdQHDvCc="
                alt="register"
              />
            </div>
            <Form
              className="register-form"
              name="register-form"
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <p className="form-title">Sign Up</p>
              <Form.Item
                className=""
                label="Name"
                name="name"
                rules={[
                    {
                      type: 'name',
                      message: 'The input is not a valid name!',
                    },
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
              >
                <Input
                  type="text"
                  placeholder="Enter your Name"
                  value={fields.name}
                  onChange={e => handleChange(e, 'name')}
                  autoComplete="new-password"
                  className="custom-input"
                />
              </Form.Item>
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
                className=""
                label="City"
                name="city"
                rules={[
                    {
                      type: 'city',
                      message: 'The input is not a valid city!',
                    },
                    {
                      required: true,
                      message: 'Please input your city!',
                    },
                  ]}
              >
                <Input
                  type="text"
                  placeholder="Enter your City"
                  value={fields.city}
                  onChange={e => handleChange(e, 'city')}
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
              >
                <Input.Password
                  placeholder="Enter your Password"
                  value={fields.password}
                  onChange={e => handleChange(e, 'password')}
                  autoComplete="new-password"
                  className="custom-input"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                    required: true,
                    message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('The password that you entered do not match!'));
                    },
                    }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your Password"
                  value={fields.confirmPassword}
                  onChange={e => handleChange(e, 'confirmPassword')}
                  autoComplete="new-password"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="register-form-button"
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
export default Register;
