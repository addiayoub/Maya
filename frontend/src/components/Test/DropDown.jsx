import React, { useState, useEffect, useRef } from "react";
import { MoreHorizontal } from "react-feather";

const defaultTrigger = (
  <MoreHorizontal
    className="inline-flex justify-center items-center hover:text-primary"
    size={19}
  />
);

const Dropdown = ({ trigger = defaultTrigger, children }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {React.cloneElement(trigger, { onClick: toggleDropdown })}
      {isDropdownVisible && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 bg-white ring-1 ring-black ring-opacity-5 rounded-md z-10 "
          style={{
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }}
        >
          {/* Dropdown content goes here */}
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
