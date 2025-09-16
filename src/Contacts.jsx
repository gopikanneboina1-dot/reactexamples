import React from "react";
import "./Contacts.css";

function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Please fill out the form below 👇</p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-details">
        <p><strong>Email:</strong> support@foodstore.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
      </div>
    </div>
  );
}

export default ContactUs;
