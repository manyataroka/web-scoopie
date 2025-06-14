import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import icecreamImage from "../assets/homepageicecream.jpg";
import logo from "../assets/scoopielogo.jpg";
import personIcon from "../assets/personlogo.jpg";
import cartIcon from "../assets/cartlogo.jpg";

function Homepage() {
  return (
    <div className="homepage">
      <header className="navbar">
        <img src={logo} alt="Scoopie Logo" className="logo" />
        <nav>
          <ul className="nav-links">
            <li>Home</li>
            <li>About Us</li>
            <li>Menu</li>
            <li>Gallery</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="nav-icons">
          <Link to="/signin">
            <img src={personIcon} alt="Profile" />
          </Link>
          <img src={cartIcon} alt="Cart" />
        </div>
      </header>

      <main className="main-section">
        <div className="image-container">
          <img src={icecreamImage} alt="Ice Cream" />
        </div>
        <div className="content-container">
          <h1 className="main-heading">GET READY TO COOL OFF.</h1>
          <p className="welcome-text">
            <strong>Welcome to Scoopie; where Sweet Moments Begin!</strong>
            <br />
            Step into a world of flavor and fun at Scoopie, your neighborhood
            destination for pure ice cream. Every scoop is made with love and
            the finest ingredients. Whether you're cooling off on a sunny day,
            celebrating a special occasion, or just treating yourself, we've
            got something to make your taste buds smile.
            <br />
            Enjoy our cozy shop, friendly service, and a rotating menu of
            seasonal flavors, sundaes, shakes, and more. Come in, grab a cone,
            and make today a little sweeter!
          </p>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
