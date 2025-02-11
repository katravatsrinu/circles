import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [circles, setCircles] = useState([]);
  const [areIntersecting, setAreIntersecting] = useState(false);

  const getRandomRadius = () => {
    return Math.floor(Math.random() * (200 - 20 + 1)) + 20;
  };

  const checkIntersection = (circles) => {
    if (circles.length !== 2) return false;

    const [circle1, circle2] = circles;
    const distance = Math.sqrt(
      Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle1.y - circle2.y, 2)
    );

    return distance < (circle1.radius + circle2.radius);
  };

  const handleClick = (e) => {
    const newCircle = {
      x: e.clientX,
      y: e.clientY,
      radius: getRandomRadius(),
    };

    const updatedCircles = [...circles, newCircle];

    if (updatedCircles.length > 2) {
      setCircles([]);
      setAreIntersecting(false);
      return;
    }

    setCircles(updatedCircles);
    setAreIntersecting(checkIntersection(updatedCircles));
  };

  return (
    <div 
      className={`min-vh-100 w-100 position-relative d-flex align-items-center justify-content-center ${areIntersecting ? 'bg-danger' : 'bg-white'}`}
      style={{ cursor: 'crosshair' }}
      onClick={handleClick}
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          className="position-absolute border border-primary rounded-circle"
          style={{
            left: circle.x,
            top: circle.y,
            width: circle.radius * 2,
            height: circle.radius * 2,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue fill color for circles
          }}
        />
      ))}
      <div className="position-absolute top-0 start-0 m-3 p-3 bg-light rounded shadow">
        <p className="text-dark mb-1">Click anywhere to create circles (max 2)</p>
        <p className={`fw-bold ${areIntersecting ? 'text-danger' : 'text-success'}`}>
          Status: {areIntersecting ? 'Circles are intersecting!' : 'No intersection'}
        </p>
        <p className="text-dark">Circles: {circles.length}/2</p>
      </div>
    </div>
  );
}

export default App;
