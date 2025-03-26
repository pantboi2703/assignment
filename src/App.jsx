import React, { useState } from 'react';

function Matrix() {
  // State to store box colors
  const [boxColors, setBoxColors] = useState([
    'gray', 'gray', 'gray',
    'gray', 'gray', 'gray',
    'gray', 'gray', 'gray'
  ]);

  // State to store the indices of clicked boxes
  const [clickedBoxes, setClickedBoxes] = useState([]);

  function handleBoxClick(boxIndex) {
    // Copy the current box colors
    let newColors = boxColors.slice();

    if (newColors[boxIndex] === 'gray') {
      // Change to green
      newColors[boxIndex] = 'green';
      setBoxColors(newColors);

      // Add the box index to the clickedBoxes array
      if (!clickedBoxes.includes(boxIndex)) {
        setClickedBoxes([...clickedBoxes, boxIndex]);
      }
    } else if (newColors[boxIndex] === 'green') {
      // Start the sequential color change for the clicked boxes
      handleSequentialChange(clickedBoxes);
    }
  }

  function handleSequentialChange(boxesToChange) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < boxesToChange.length) {
        const boxIndex = boxesToChange[i];
        setBoxColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[boxIndex] = 'orange'; // Change to orange
          return newColors;
        });
        i++;
      } else {
        clearInterval(interval); // Stop the interval when done
        // Clear the clickedBoxes array to reset
        setClickedBoxes([]);
      }
    }, 500); // 500ms delay between updates
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '10px' }}>
        {boxColors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: color,
              border: '1px solid black',
              cursor: 'pointer'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Matrix;