import React, { useState, useEffect } from "react";
import CustomerNavigation from "../customerNavigation";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import CustomerFooter from "../customerFooter";
import detalis from "../../details.jpg";
import aveter from "../../avatar.png";
import { confirmAlert } from "react-confirm-alert";

const UpdateProfile = () => {
  const [profile, setprofile] = useState({});
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const history = useHistory();

  function logout() {
    localStorage.removeItem("CustomerIsLoggedIn");
    localStorage.removeItem("CustomerID");

    history.push("/");
    window.location.reload();
  }

  function OnUpdate() {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  }

  function OnDelete() {}

  async function updateProfle() {
    const response = await fetch(
      `http://localhost:5000/api/customers/${localStorage.getItem(
        "CustomerID"
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname || profile.firstname,
          lastname: lastname || profile.lastname,
          address: address || profile.address,
          city: city || profile.city,
          email: profile.email,
          phone: phone || profile.phone,
          password: password || profile.password,
        }),
      }
    );

    if (response.ok) {
      history.push("/customerProfile");
      window.location.reload();
    }
  }

  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  useEffect(() => {
    const sendRequest = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/customers/${localStorage.getItem(
          "CustomerID"
        )}`
      );
      setprofile(data);
      console.log(data);
    };
    sendRequest();
  }, []);

  return (
    <React.Fragment>
      <CustomerNavigation />

      <div class="card text-white">
        <img width="500" height="150" class="card-img" src={detalis} alt="" />
        <div class="card-img-overlay">
          <h1 class="card-title text-center">UPDATE PROFILE</h1>
        </div>
      </div>

      <div className="my-5">
        <section id="actions" class="py-4 mb-4 bg-light">
          <div class="container">
            <div class="row">
              <div class="col-md-3"></div>
            </div>
          </div>
        </section>

        <section id="profile">
          <div class="container">
            <div class="row">
              <div class="col-md-9">
                <div class="card">
                  <div class="card-header">
                    <h4>Profile</h4>
                  </div>
                  <div class="card-body">
                    <form>
                      <div class="form-row">
                        <div class="col">
                          <label for="email">First name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="First name"
                            value={profile.firstname}
                            onChange={(e) => {
                              profile.firstname = setfirstname(e.target.value);
                            }}
                          />
                        </div>
                        <div class="col">
                          <label for="email">Last name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last name"
                            value={profile.lastname}
                            onChange={(e) => {
                              profile.lastname = setlastname(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="Addresss">Addresss</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Address"
                          value={profile.address}
                          onChange={(e) => {
                            profile.address = setaddress(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label for="city">City</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="City"
                          value={profile.city}
                          onChange={(e) => {
                            profile.city = setcity(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label for="phone">Phone</label>
                        <input
                          type="text"
                          class="form-control"
                          value={profile.phone}
                          onChange={(e) => {
                            profile.phone = setphone(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          value={profile.email}
                          readOnly
                        />
                      </div>

                      <div class="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          value={profile.password}
                          id="myInput"
                          onChange={(e) => {
                            profile.password = setpassword(e.target.value);
                          }}
                        />
                      </div>
                      <div class="form-check">
                        <label class="form-check-label mr-2">
                          <input
                            type="checkbox"
                            onClick={myFunction}
                            class="form-check-input"
                          />{" "}
                          Show Password
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <h3>HI {profile.lastname}</h3>
                <img src={aveter} alt="" class="d-block img-fluid mb-3" />
                <button
                  class="btn btn-primary btn-block"
                  onClick={updateProfle}
                >
                  Update Profle
                </button>
                <button class="btn btn-danger btn-block" onClick={logout}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CustomerFooter />
    </React.Fragment>
  );
};

export default UpdateProfile;
