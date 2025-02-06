import React, { useState } from 'react';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку на сервер
    const savedFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    savedFeedback.push({...feedback, date: new Date().toISOString()});
    localStorage.setItem('feedback', JSON.stringify(savedFeedback));
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFeedback({ name: '', email: '', message: '' });
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2 className="gradient-text">💬 Ваше мнение важно!</h2>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label>Имя</label>
            <input 
              type="text" 
              required
              value={feedback.name}
              onChange={(e) => setFeedback({...feedback, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required
              value={feedback.email}
              onChange={(e) => setFeedback({...feedback, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Сообщение</label>
            <textarea
              rows="5"
              required
              value={feedback.message}
              onChange={(e) => setFeedback({...feedback, message: e.target.value})}
            />
          </div>

          <button type="submit" className="btn-primary">
            Отправить <i className="fas fa-paper-plane"></i>
          </button>
        </form>

        {submitted && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i> Спасибо! Ваш отзыв успешно отправлен!
          </div>
        )}
      </div>

      <div className="testimonials">
        <h3>💡 Что говорят пользователи</h3>
        <div className="testimonials-grid">
          {JSON.parse(localStorage.getItem('feedback') || '[]').map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="user-meta">
                <div className="avatar">{item.name[0]}</div>
                <div>
                  <h4>{item.name}</h4>
                  <small>{new Date(item.date).toLocaleDateString()}</small>
                </div>
              </div>
              <p className="message">"{item.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;