import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Form from "react-bootstrap/Form";

import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import { Space, Spin } from "antd";

import axios from "axios";
import Navbar from "./Navbar";
import { loadData, saveData } from "./localStorage";

function Login() {
  const [contacts, setContacts] = useState([]);
  const [wait, setWait] = useState(0);

  let [form, setForm] = useState({})
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState(false);
  
  const [widthTotal, setWidth] = useState(window.innerWidth);
  
  const history = useNavigate();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleChange = ({name, value}) =>{
    console.log("fcoj")
  setForm({...form, [name]: value})
  

  }
  const handleSubmit = (e) =>{

    e.preventDefault()

    if (form.username == "foo" && form.password == "bar") {

     saveData("token", form.username)

        history("/home")
    }else {

        setError(true)
        setTimeout(()=>{
            setError(false)
        },2000)
        setForm({})
    }

  }
  useEffect(() => {
    // Load initial contacts
    fetchContacts();
  }, []);

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

 let rowDiv = {
   border: "15px solid white",
   borderRadius: "20px",
   height: "100vh",
   justifyContent: "center",
   padding: "5%",
   alignItems: "center",
   alignContent: "center",
   color: "white",
   margin: "5%",
   width: widthTotal < 800 ? "90%": "50%" ,
   backgroundColor: "#7925C7",
 };

console.log(form, " form")
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
              <h1
                style={{
                  margin: "auto",
                  textAlign: "center",
                  borderBottom: "5px solid white",
                  paddingBottom: "5px",
                }}
              >
                Login
              </h1>
              <Form
                style={{
                  padding: "5%",
                  marginTop: "10%",
                  border: "1px solid white",
                  borderRadius: "20px",
                }}
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={form.username ? form.username : ""}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password ? form.password : ""}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
                {error ? (
                  <Alert key={"danger"} variant={"danger"} style={{marginTop:"5%"}}>
                    Wrong Credentials! Try Again
                  </Alert>
                ) : (
                  ""
                )}
              </Form>
            </div>
          </Row>
        </Container>
      </InfiniteScroll>
    </>
  );
}

export default Login;