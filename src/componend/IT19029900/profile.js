import React, { useState, useEffect } from "react";
import CustomerNavigation from "../customerNavigation";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import CustomerFooter from "../customerFooter";
import detalis from "../../details.jpg";
import aveter from "../../avatar.png";

const Profile = () => {
  const [profile, setprofile] = useState({});

  const history = useHistory();

  function logout() {
    localStorage.removeItem("CustomerIsLoggedIn");
    localStorage.removeItem("CustomerID");
    localStorage.removeItem("CustomerEmail");

    history.push("/");
    window.location.reload();
  }

  function EditProflie() {
    history.push("/updateProfile");
  }

  function PDFfunction() {
    const PDF = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/customers/pdf/${localStorage.getItem(
          "CustomerID"
        )}`
      );
    };
    PDF();
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
          <h1 class="card-title text-center">PROFILE</h1>
        </div>
      </div>

      <div className="my-5">
        <section id="actions" class="py-4 mb-4 bg-light">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <button onClick={EditProflie} class="btn btn-success btn-block">
                  Edit Profile
                </button>
              </div>
              <div class="col-md-3">
                <button onClick={PDFfunction} class="btn btn-success btn-block">
                  PDF genarate
                </button>
              </div>
              <div class="col-md-3">
                <Link to="/paymentHistory" class="btn btn-success btn-block">
                  Payment History
                </Link>
              </div>
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
                            readOnly
                          />
                        </div>
                        <div class="col">
                          <label for="email">Last name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last name"
                            value={profile.lastname}
                            readOnly
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
                          readOnly
                        />
                      </div>

                      <div class="form-group">
                        <label for="city">City</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="City"
                          value={profile.city}
                          readOnly
                        />
                      </div>

                      <div class="form-group">
                        <label for="phone">Phone</label>
                        <input
                          type="text"
                          class="form-control"
                          value={profile.phone}
                          readOnly
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
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <h3>HI {profile.lastname}</h3>
                <img src={aveter} alt="" class="d-block img-fluid mb-3" />

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

export default Profile;
