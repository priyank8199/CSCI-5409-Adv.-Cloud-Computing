import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './header';
import "./App.css";
import "./Movies.css";

const { Search } = Input;

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${process.env.HOSTED_URL}/allMovies`)
      .then((res) => {
        console.log("API Response:", res.data);
        setMovieList(res.data); // Set the movie list directly from res.data
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleClick = (id) => {
    console.log(id);
    navigate(`/movies/${id}`);
  };

  return (
    <>
    <Navbar title={'loggedIn'}/>
    <div className="user-list">
      <h1>Movies List</h1>
      {/*<img src="img/back.png" alt="" className="form-pic-1" />*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20
        }}
      >
        <Search
          className="search-bar"
          placeholder="Search by First Name or Last Name"
          prefix={<SearchOutlined />}
          value={searchQuery}
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 400, border: 2}}
        />
      </div>
      <Row gutter={[16, 16]}>
        {movieList
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Link to={`/movies/${movie.id}`}>
                <Card
                  className="different-card"
                  style={{ width: '400px', height: '250px', margin: '0 auto' }}
                  title={<img style={{ width: '120px', height: '60px' }} className="users-post-img" src={movie.image} alt={movie.title} />}
                  onClick={() => handleClick(movie.id)}
                >
                  <p>Movie Title: {movie.title}</p>
                  <p>Released On: {movie.releaseDate}</p>
                  <p>Duration: {movie.duration}</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
    </>
  );
}

export default Movies;
