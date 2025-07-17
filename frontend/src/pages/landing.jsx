import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2 onClick={() => {
            router("/home")
          }}>NeoSetu</h2>
        </div>
        <div className="navList">
          <p
            onClick={() => {
              router("/guest");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div className="leftMainContainer">
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> hustle free
          </h1>
          <p style={{ marginTop: "1rem", fontWeight: "250" }}>
            Cover a distance by NeoSetu
          </p>
          <div role="button">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>
        <div className="rightMainContainer">
          <img src="/mobile.png" alt="mobile" />
        </div>
      </div>
    </div>
  );
}
