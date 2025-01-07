const Navbar = () => {
  // Function to smoothly scroll to a section by id
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({
      top: section.offsetTop - 60, // Adjust based on navbar height
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 shadow-lg z-50">
      <div className="flex justify-between items-center">
        {/* <div className="text-white font-bold text-xl">Your Logo</div> */}
        <img className=" h-[40px] w-[100px]" src="/assets/images/manzil_logo.png" alt="" />
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            onClick={() => scrollToSection("users-table")}
          >
            Users Table
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            onClick={() => scrollToSection("tshirt-design")}
          >
            T-shirt Design
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
