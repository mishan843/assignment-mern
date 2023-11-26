import React, { useState } from "react";
import { RiRecordCircleFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { FaXmark, FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const user = useState(localStorage.getItem("user"))
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: `/my-recipe/:id`, title: "My Recipes" },
    { path: "/add-recipe", title: "Add Recipe" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-blue-200">
      <nav className="flex justify-between items-center py-6">
        <Link className="flex items-center gap-2 text-2xl text-black" to="/">
          <RiRecordCircleFill className="text-5xl" />
          <span>Food Racipes</span>
        </Link>
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <button><Link to="/login" className="py-2 px-5 rounded border">Log in</Link></button>
          <button><Link to="/signup" className="py-2 px-5 rounded border text-white bg-blue-500">
            Sign up
          </Link></button>
        </div>

        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
        {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white first:text-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1"><Link>Log in</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

