import React from "react";
import './Partners.css';  // Assuming you will add styles here
import ecommerce from '../components/ecommerce.png';
import food_delivery from '../components/food_del.jpg';
import fashion from '../components/fashion.jpg';

function Partners() {
  return (
    <div className="partners-page">
      <h2>Our Partners</h2>
      <div className="partner-options">
        {/* Food Delivery App */}
        <div className="partner-item">
          <a href="http://localhost:5176/" target="_blank" rel="noopener noreferrer">
            <div className="partner-card">
              <img
                className="partner-image"
                src={food_delivery}
                alt="Food Delivery"
              />
              <h3>Food Delivery App</h3>
              <p>Order your favorite food from the best restaurants.</p>
            </div>
          </a>
        </div>

        {/* E-commerce App */}
        <div className="partner-item">
          <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer">
            <div className="partner-card">
              <img
                className="partner-image"
                src={ecommerce}
                alt="E-commerce"
              />
              <h3>E-commerce App</h3>
              <p>Shop online for the best deals on products.</p>
            </div>
          </a>
        </div>

        {/* Grocery Delivery */}
        <div className="partner-item">
          <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer">
            <div className="partner-card">
              <img
                className="partner-image"
                src={ecommerce}
                alt="Grocery Delivery"
              />
              <h3>Grocery Delivery</h3>
              <p>Get fresh groceries delivered to your doorstep.</p>
            </div>
          </a>
        </div>

        {/* Fashion Store */}
        <div className="partner-item">
          <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer">
            <div className="partner-card">
              <img
                className="partner-image"
                src={fashion}
                alt="Fashion Store"
              />
              <h3>Fashion Store</h3>
              <p>Explore the latest fashion trends online.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Partners;
