import { useRef, useState } from "react";
import Draggable from "react-draggable";

const TshirtDesignPage = () => {
  const [logo, setLogo] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const tShirtRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoResize = (e) => {
    const { value } = e.target;
    const newWidth = parseInt(value, 10);
    setLogoSize({
      width: newWidth,
      height: (newWidth * logoSize.height) / logoSize.width,
    });
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
          const tShirtRect = tShirtElement.getBoundingClientRect();
          const logoRect = logoElement.getBoundingClientRect();

          // Calculate logo position relative to the t-shirt container
          const relativeLeft = logoRect.left - tShirtRect.left;
          const relativeTop = logoRect.top - tShirtRect.top;

          // Scale positions to canvas size
          const scaleX = canvas.width / tShirtElement.offsetWidth;
          const scaleY = canvas.height / tShirtElement.offsetHeight;

          ctx.drawImage(
            logoImg,
            relativeLeft * scaleX,
            relativeTop * scaleY,
            logoRect.width * scaleX,
            logoRect.height * scaleY
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

      <div className="flex w-full">
        {/* T-Shirt Preview Area */}
        <div
          ref={tShirtRef}
          className="relative w-80 h-96 bg-gray-100 bg-center flex-[0.5]"
          style={{
            backgroundImage: "url('/assets/images/tshirt.jpg')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Draggable and Resizable Logo */}
          {logo && (
            <Draggable
              bounds="parent"
              onStart={() => setDragging(true)}
              onStop={() => setDragging(false)}
            >
              <div
                className={`absolute p-1 cursor-move logo ${
                  dragging ? "ring-2 ring-blue-500" : ""
                }`}
                style={{
                  width: `${logoSize.width}px`,
                  height: `${logoSize.height}px`,
                }}
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

        {/* Upload, Resize, and Generate Actions */}
        <div className="flex flex-col space-y-4 flex-[0.5] justify-center items-center">
          <div
            className={`border-2 border-dashed p-4 rounded-lg text-center cursor-pointer w-[400px] ${
              logo ? "border-green-500" : "border-gray-500"
            }`}
            onClick={() => fileInputRef.current.click()}
          >
            {logo ? (
              <img
                src={logo}
                alt="Uploaded Logo Preview"
                className="max-h-20 mx-auto"
              />
            ) : (
              <p className="text-gray-500">Click to upload an image</p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Resize Slider */}
          {logo && (
            <div className="flex items-center space-x-4">
              <label htmlFor="resize" className="font-medium">
                Resize Logo:
              </label>
              <input
                id="resize"
                type="range"
                min="50"
                max="200"
                value={logoSize.width}
                onChange={handleLogoResize}
                className="w-full"
              />
            </div>
          )}

          <button
            onClick={handleGenerateImage}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate Final Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default TshirtDesignPage;
