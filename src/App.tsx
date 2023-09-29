// Create a type or interface for your images
type Image = {
  default: string;
};

import React, { useEffect, useState } from 'react';
import './App.css';
import * as images from '../src/assets/jokers/index';

function App() {
  const [imageComponents, setImageComponents] = useState<JSX.Element[]>([]);
  
  console.info(Object.values(images));

  useEffect(() => {
    // Extract image imports from the 'images' object
    const importedImages = Object.values(images) as Image[];

    // Create image components from the imported images
    const imageComponents = importedImages.map((image, index) => (
      <img
        key={index}
        src={image.default} // Use the 'default' property to get the image URL
        alt={`Image ${index}`}
      />
    ));

    // Update the state with the image components
    setImageComponents(imageComponents);
  }, []);
  

  return (
    <div className="App">
      {imageComponents}
    </div>
  );
}

export default App;
