import React, { useState } from 'react';
import './App.css';

function App() {
  const [circles, setCircles] = useState([]);
  const [status, setStatus] = useState('Click to create circles (max 2)');
  const [intersect, setIntersect] = useState(false);

  const getRadius = () => Math.floor(Math.random() * 181) + 20;

  const checkOverlap = (c1, c2) => {
    const dist = Math.sqrt((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2);

    if (dist <= Math.abs(c1.r - c2.r)) {
      setIntersect(true);
      return c1.r > c2.r ? "Second circle is inside the first" : "First circle is inside the second";
    } else if (dist < c1.r + c2.r) {
      setIntersect(true);
      return "Circles overlap";
    } else if (dist === c1.r + c2.r) {
      setIntersect(true);
      return "Circles touch";
    } else {
      setIntersect(false);
      return "Circles are separate";
    }
  };

  const handleClick = (e) => {
    const newCircle = { x: e.clientX, y: e.clientY, r: getRadius() };
    let newCircles = [...circles, newCircle];

    if (newCircles.length > 2) {
      newCircles = [newCircle];
      setStatus('Click to create circles (max 2)');
      setIntersect(false);
    } else if (newCircles.length === 2) {
      setStatus(checkOverlap(newCircles[0], newCircles[1]));
    }

    setCircles(newCircles);
  };

  return (
    <div className={`canvas ${intersect ? 'intersecting' : ''}`} onClick={handleClick}>
      {circles.map((c, i) => (
        <div key={i} className="circle" style={{ left: c.x, top: c.y, width: c.r * 2, height: c.r * 2 }} />
      ))}
      <div className="info">
        <p>{status}</p>
        <p>Circles: {circles.length}/2</p>
      </div>
    </div>
  );
}

export default App;
