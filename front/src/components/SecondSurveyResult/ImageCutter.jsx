import { useState, useEffect } from "react";

function ImageCutter({ imageUrl, topLeft, bottomLeft }) {
  const [output, setOutput] = useState(null);

  useEffect(() => {
    cropImageNow();
  }, []);

  const cropImageNow = async () => {
    if (!imageUrl || !topLeft || !bottomLeft) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = Math.abs(bottomLeft.x - topLeft.x) * 2;
        canvas.height = Math.abs(bottomLeft.y - topLeft.y) * 2;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          image,
          Math.min(topLeft.x, bottomLeft.x),
          Math.min(topLeft.y, bottomLeft.y),
          Math.abs(bottomLeft.x - topLeft.x),
          Math.abs(bottomLeft.y - topLeft.y),
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Converting to base64
        const base64Image = canvas.toDataURL("image/jpeg");
        setOutput(base64Image);
      };

      image.src = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching or processing image:", error);
    }
  };

  return <>{output && <img src={output} alt="Cropped" />}</>;
}

export default ImageCutter;
