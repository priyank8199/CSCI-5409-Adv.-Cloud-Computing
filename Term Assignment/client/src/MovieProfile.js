import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Input, Col, Row, } from "antd";
import {useParams } from "react-router-dom";
import "./MovieProfile.css";
import Navbar from './header';

function MovieProfile() {
  const [movie, setMovie] = useState([]);
  const [fields, setFields] = useState({
    name: null,
    email: null,
    quantity: null,
    total: null,
    showTime: null,
    title: null,
  });
  const params = useParams();
  const mid = {id:params.id};

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the entered value is a valid number or empty
    const quantity = value.trim() !== '' ? parseInt(value, 10) : 0;
    const total = isNaN(quantity) ? 0 : parseInt(movie.price, 10) * quantity;

    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
      quantity: quantity,
      total: total,
      title: movie.title,
      showTime: movie.showTime,
    }));
  };

  const getData = async () => {
    try {
      const id = localStorage.getItem('id');
      axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((res) => {
          const responseData = {
            ...res.data, // Copy the existing data fields
            quantity: fields.quantity,
            total: fields.total,
          };
          setFields(responseData); // Update the state with the new data
          console.log("API Response:", responseData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  

  const bookTicket = async() => {
    try{
    axios
    .post(`${process.env.HOSTED_URL}/generateTicket`, fields)
    .then((res) => {
      console.log("API Response:", res.data);
      
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }
  catch(e){
    console.log(e);
  }
}


useEffect(() => {
  axios.post(`${process.env.HOSTED_URL}/movie`, mid)
    .then((res) => {
      setMovie(res.data); 
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);


  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Navbar title={'loggedIn'}/>
    <section className="profile-section">
          <div className="parent-container">

            <Row gutter={[16, 16]}>
              <Col lg={8} xs={24}>
                <Card className="profile-card">
                  <h1>Book Tickets</h1>
                  <div className="avatar">
                  <img
                      src={movie.image}
                      alt="avatar"
                    />
                  </div>
                  <Form
              className="login-form"
              name="login-form"
              initialValues={{ remember: true }}
              layout="vertical"
            >              
              <Form.Item
                className=""
                label="Number of Seats"
                name="quantity"
              >
                <Input
                  type="text"
                  placeholder="Enter your seat quantity"
                  value={fields.quantity}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="custom-input"
                />
              </Form.Item>
              </Form>
              <p>Total: ${fields.total}</p>
          <Button type="primary" onClick={bookTicket}>Book Ticket</Button>
                </Card>
              </Col>
              <Col lg={16} xs={24}>
                <Card className="profile-card">
                  <h1 className="my-details">Movie Details</h1>
                  <div className="profile-info">
                    <div className="info-row">
                   
                      <span className="info-label">
                        <b>Title :</b>
                      </span>
                      <span className="info-value">{movie.title}</span>
                    </div>
                    <div className="info-row">
                      
                      <span className="info-label">
                        <b>Director :</b>
                      </span>
                      <span className="info-value">{movie.director}</span>
                    </div>
                    <div className="info-row">
               
                      <span className="info-label">
                        <b>Description :</b>
                      </span>
                      <span className="info-value">{movie.description}</span>
                    </div>
                    <div className="info-row">
                      
                      <span className="info-label">
                        <b>Release Date :</b>
                      </span>
                      <span className="info-value">{movie.releaseDate}</span>
                    </div>
                    <div className="info-row">
                    
                      <span className="info-label">
                        <b>Duration :</b>
                      </span>
                      <span className="info-value">{movie.duration}</span>
                    </div>
                    
                    <div className="info-row">
                      
                      <span className="info-label">
                        <b>Show Time :</b>
                      </span>
                      <span className="info-value">{movie.showTime}</span>
                    </div>
                    <div className="info-row">
                      
                      <span className="info-label">
                        <b>Ticket Price :</b>
                      </span>
                      <span className="info-value">${movie.price}</span>
                    </div>
                    
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
    </>
  );
  
}

export default MovieProfile;
