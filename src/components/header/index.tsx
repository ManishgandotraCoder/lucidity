import ToggleComponent from "../toggle";

const Header = () => {
  return (
    <header className=" text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Logo</h1>

        {/* Toggle Component */}
        <ToggleComponent />
      </div>
    </header>
  );
};

export default Header;
