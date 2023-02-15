import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Space, Spin } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import Navbar from "./Navbar";
import Login from "./Login";
import { PrivateRoute } from "./privateRoute";

const LOGIN_URL = "https://myapp.com/api/login";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [wait, setWait] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const [widthTotal, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Load initial contacts
    fetchContacts();
  }, []);
  let rowDiv = {
      border: "15px solid white",
                borderRadius: "20px",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                margin: "5%",
                width: widthTotal < 800 ? "100%": "50%",
                backgroundColor: "#7925C7",
  }

  function fetchContacts() {
    let k = wait;
    console.log("calling ", k);
    setLoading(true);
    setTimeout(() => {
      if (contacts.length == 500) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      axios
        .get(`https://randomuser.me/api/?results=${k + 10}`)
        .then((response) => {
          setHasMore(response.data.results.length <= 500);
          setContacts([...response.data.results]);
          setWait(k + 10);
          console.log(response, " checkingjhufih");

          setLoading(false);
        });
    }, 1000);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    history("/");
  }

  let mainRow = {
    flexDirection: "column",
    width: widthTotal < 1000 ? "98%" : "80%",
    justifyContent: "center",
    margin: "auto",
    borderRadius: "30px",
    backgroundColor: "#FAFAFA",
    border: "2px solid green",
    alignContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <InfiniteScroll
        dataLength={contacts.length}
        next={fetchContacts}
        hasMore={hasMore}
      >
        <Container
          style={{
            // add flexWrap: wrap
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row
            style={mainRow}
          >
            <div
              style={rowDiv}
            >
              <Button
                style={{
                  width: "fit-content",

                  marginTop: "20px",
                  marginRight: "20px",
                  marginBottom: "-40px",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <div
                style={{
                  width: "100%",
                  margin: "auto",
                  borderBottom: "2px solid white",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Navbar />
              </div>
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  xs={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#3F51B6",
                    color: "white",
                    margin: "auto",
                    borderRadius: "30px",
                    padding: "15%",
                    border: "5px solid white",
                    justifyContent: "space-around",
                    alignItems: "center",
                    // set fixed width of the container
                    marginTop: "30px",
                  }}
                >
                  <p
                    style={{ padding: "5%" }}
                  >{`${contact.name.first} ${contact.name.last}`}</p>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: "100%", // set width to 100%
                        height: "auto", // set height to auto
                        border: "2px solid white",
                      }}
                      src={contact.picture.medium}
                      roundedCircle
                    />
                  </div>
                  <br />
                </div>
              ))}
              <div
                style={{
                  width: "fit-content",
                  margin: "auto",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {loading && (
                  <Space
                    style={{
                      margin: "auto",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: "5%",
                    }}
                  >
                    <Spin size="large" />
                    <h3 style={{ color: "lightblue" }}>Loading</h3>
                  </Space>
                )}
                {!hasMore ? (
                  <Space style={{ color: "lightblue", marginTop: "5%" }}>
                    <CheckOutlined style={{ fontSize: "180%" }} />
                    <h4>All Loaded</h4>
                  </Space>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Row>
        </Container>
      </InfiniteScroll>
    </>
  );
}
export default ContactList;
