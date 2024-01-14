// import { useState, useEffect, useRef } from "react";

// const Navbar = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = (event) => {
//     // Close the dropdown if the click is outside the dropdown
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     // Attach event listener to handle clicks outside the dropdown
//     document.addEventListener("click", closeDropdown);

//     // Clean up the event listener on component unmount
//     return () => {
//       document.removeEventListener("click", closeDropdown);
//     };
//   }, []);

//   return (
//     <>
//       <div className="flex-1 border  flex flex-col overflow-hidden">
//         <header className="bg-[#662671] shadow py-2">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex h-9 px-2">
//               <img className="w-11" src="./img/Group.svg" alt="" />
//               <img className="w-44" src="./img/Group1.svg" alt="" />
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   type="button"
//                   className="flex items-center text-gray-600 focus:outline-none"
//                   onClick={toggleDropdown}
//                 >
//                   <img
//                     className="h-8 w-8 rounded-full mr-5"
//                     src="./img/Vector.svg"
//                     alt=""
//                   />
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute border-4 right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <a
//                       href="#"
//                       className="block px-4 py-2 text-sm text-gray-700"
//                     >
//                       Sign out
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import  { useState } from 'react';

function NavBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    
    
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-[#662671] shadow">
          <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
            <div className='flex gap-1 items-center'>
                <div className="w-6 ">
                <img  src="./img/Group.svg" alt=""/>
                </div>
                <div>
                <img className="w-32 " src="./img/Group1.svg" alt="" />
                </div>
               
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center text-gray-600 focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/img/Vector.svg"
                    alt=""
                  />
                  
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

      
      </div>
   

  );
}

export default NavBar;
