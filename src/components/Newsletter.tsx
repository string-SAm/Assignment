import React, { useState } from 'react';
import axios from 'axios';
import './styled//NewsLetter.css'; // Add your CSS file for styling

const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://api-dev.bitdelta.com/api/v1/public/news-subscription', {
        email: email
      });
      setLoading(false);
      setSuccessMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <div className="image-container">
        {/* Random image display */}
        <img src="https://source.unsplash.com/400x300/random" alt="Random" />
      </div>
      <div className="form-container">
        <h2>Subscribe to Our News Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address :</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
