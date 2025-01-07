import  { useRef, useState } from "react";
import Draggable from "react-draggable";

const TshirtDesignPage = () => {
  const [logo, setLogo] = useState(null);
  const [dragging, setDragging] = useState(false);
  const tShirtRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    const tShirtElement = tShirtRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = tShirtElement.offsetWidth;
    canvas.height = tShirtElement.offsetHeight;

    // Draw t-shirt background
    const img = new Image();
    img.src = tShirtElement.style.backgroundImage.slice(5, -2); // Extract URL
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw logo
      if (logo) {
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = () => {
          const logoElement = document.querySelector(".logo");
          const rect = logoElement.getBoundingClientRect();
          const scaleX = canvas.width / tShirtElement.offsetWidth;
          const scaleY = canvas.height / tShirtElement.offsetHeight;

          ctx.drawImage(
            logoImg,
            rect.left * scaleX,
            rect.top * scaleY,
            rect.width * scaleX,
            rect.height * scaleY
          );

          // Download the final image
          const link = document.createElement("a");
          link.download = "t-shirt-design.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
      }
    };
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-xl font-bold">T-Shirt Logo Designer</h1>

      {/* T-Shirt Preview Area */}
      <div
        ref={tShirtRef}
        className="relative w-80 h-96 bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: "url('/tshirt.png')" }}
      >
        {/* Draggable Logo */}
        {logo && (
          <Draggable
            bounds="parent"
            onStart={() => setDragging(true)}
            onStop={() => setDragging(false)}
          >
            <div
              className={`absolute p-1 cursor-move ${
                dragging ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ width: "100px" }}
            >
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Draggable>
        )}
      </div>

      {/* Upload and Actions */}
      <div className="flex flex-col space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
        />
        <button
          onClick={handleGenerateImage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Generate Final Image
        </button>
      </div>
    </div>
  );
};

export default TshirtDesignPage;
