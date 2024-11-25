"use client";
import { useState, useEffect } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { MdDashboardCustomize } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
// import Image from "next/image";

export default function Sidebar({
  miniToggle,
  setMiniToggle,
  miniSidebar,
  setMiniSidebar,
}) {
  //   const { user, loading } = useCurrentUser();

  const loading = false;

  // SignOut Functionality

  const handleSignOut = async () => {
    // await supabase.auth.signOut();
    // router.push("/");
    alert("We are signing out");
    // if (loading) {
    //   return <Spinner />;
    // }
  };

  //Handling Navigation for the sidebar
  const handleNavigate = (point) => {
    // return router.push(`/auth/dashboard/${point}`);
    return alert(point);
  };

  // retrieving user information from currentUser.js
  //   const name = user?.user_metadata?.name?.split(" ");
  //   const firstName = name?.[0];
  //   const LastName = name?.[1];
  // State Management for smaller screens
  // const [miniToggle, setMiniToggle] = useState(true);
  // const [miniSidebar, setMiniSidebar] = useState(false);
  // State Management for regular sized screens
  const [toggle, setToggle] = useState(true);
  const [activeLink, setActiveLink] = useState(false);

  const MenuLinks = [
    {
      title: "Create Task",
      src: <MdDashboardCustomize />,
      onClick: handleNavigate,
    },

    {
      title: "All Tasks",
      src: <AiOutlineSchedule />,
      gap: false,
      onClick: handleNavigate,
    },

    {
      title: "Sign Out",
      src: <LiaSignOutAltSolid />,
      onClick: handleSignOut,
    },
  ];

  useEffect(() => {
    const handleSideMenu = () => {
      //   setMiniSidebar(window.innerWidth < 768);
      setMiniSidebar(true);
    };

    // Check if window is defined before accessing it
    if (typeof window !== "undefined") {
      handleSideMenu();
      window.addEventListener("resize", handleSideMenu);

      return () => {
        window.removeEventListener("resize", handleSideMenu);
      };
    }
  }, []);

  console.log("Current miniSidebar state:", miniSidebar); // Move console.log here or within the return statement

  return (
    <>
      {
        loading && <div> loading....</div>
        //    <Spinner />
      }
      {!miniSidebar ? (
        <aside
          className={` ${
            toggle ? "w-96" : "w-20"
          }  ease-in-out duration-500 h-screen bg-[#000070] fixed left-0 top-0 md:relative p-5 pt-8 z-50`}
        >
          <TiChevronLeft
            alt="Controller icon for collapsable sidebar"
            className={`absolute bg-white cursor-pointer  rounded-full -right-3 top-9 w-7 border-2 border-ui_primary ${
              !toggle && "rotate-180"
            } ease-in-out duration-500 hidden`}
          />

          {/* Header for sidebar */}
          <div className="flex gap-x-4 items-center">
            {/* The images are commented out and icons are used as placeholders till the main logo and other icons arrive */}

            <h1
              className={`font-poppins origin-left text-[2rem] font-[700] leading-8 text-white ${
                !toggle && "scale-[0.3]"
              } cursor-pointer hover:animate-pulse duration-500 mb-2`}
            >
              LIST
            </h1>
          </div>
          {/* Link Items */}
          <ul className="pt-6">
            {MenuLinks.map((menu, index) => (
              <li
                key={index}
                className={`text-[#a0a0a0] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-50 group bg-transparent rounded-md duration-500 ${
                  menu.gap ? "mt-9" : "mt-3"
                }  `}
                onClick={() => {
                  setActiveLink(index);
                  setToggle(!toggle);
                  // setLoading(true);
                  if (menu.onClick == handleSignOut) {
                    menu.onClick();
                  } else if (menu.onClick == handleNavigate) {
                    menu.onClick(menu.title);
                  }
                }}
              >
                <div
                  className={` md:h-4 md:w-4  ${
                    activeLink === index && "text-ui_secondary1"
                  } `}
                >
                  {menu.src}
                </div>
                <span
                  className={`${
                    !toggle && "scale-0"
                  } duration-500 ease-in-out group-hover:text-ui_secondary1`}
                >
                  {" "}
                  {menu.title}{" "}
                </span>
              </li>
            ))}
            <div
              className="text-accent_3 text-sm flex items-center gap-x-4 cursor-pointer p-2  hover:bg-white  hover:text-ui_secondary1 bg-transparent mt-8 rounded-md duration-500"
              onClick={() => setToggle(!toggle)}
            >
              <div className=" ">
                <TiChevronLeft className={`${!toggle && "rotate-180"}`} />
              </div>
              <span
                className={`${!toggle && "scale-0"}  duration-500 ease-in-out`}
              >
                {" "}
                Collapse Menu{" "}
              </span>
            </div>
            <div
              className="text-accent_3 text-sm flex items-center gap-x-4 cursor-pointer p-2  bg-transparent mt-8 duration-500"
              onClick={() => setToggle(!toggle)}
            >
              {/* {user ? (
                <div className="text-white  h-[50px] w-[50px] rounded-full flex items-center justify-center bg-slate-500 cursor-pointer">
                  {user?.email[0].toUpperCase()}
                </div>
              ) : (
                <img
                  src="/assets/images/pexels-vlad-bagacian-1368382.jpg"
                  alt="Profile Icon"
                  className="text-white italic h-[50px]  rounded-full flex items-center bg-ui_secondary1 cursor-pointer"
                />
              )} */}

              <span className={`flex flex-col gap-0 ${!toggle && "scale-0"}`}>
                <h3 className="text-md font-[600] text-[#fefefe]">
                  Izu<strong>Uchendu</strong>
                  <br />
                  izuchukwu.uchendu@gmail.com
                </h3>
                <p className="text-[0.75rem] text-accent_3 mt-1">
                  Your personal account
                </p>
              </span>
            </div>
          </ul>
        </aside>
      ) : (
        <aside
          className={` ${
            miniToggle ? "w-72" : "fixed left-[-10%] duration-500 "
          }  ease-in-out duration-500 h-screen   bg-[#122156]
 fixed left-0 top-0 md:relative p-5 pt-8 z-50`}
        >
          <IoIosArrowBack
            onClick={() => setMiniToggle(!miniToggle)}
            alt="Controller icon for collapsable sidebar"
            className={`absolute bg-slate-200 font-[600] cursor-pointer text-slate-700  rounded-md h-10 -right-14 p-2 top-28 shadow-[-5px 0px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)] w-10 ${
              !miniToggle && "rotate-180"
            } ease-in-out duration-500`}
          />
          {/* Header for sidebar */}
          <div className="flex gap-x-4 items-center">
            {/* The images are commented out and icons are used as placeholders till the main logo and other icons arrive */}

            <h1
              className={`font-poppins origin-left text-[2rem] font-[700] leading-8 text-white ${
                !miniToggle && "scale-[0.3]"
              } cursor-pointer hover:animate-pulse duration-500`}
            >
              To-LIST
            </h1>
          </div>
          {/* Link Items */}
          <ul className="pt-6">
            {MenuLinks.map((menu, index) => (
              <Link
                to="/all-tasks"
                key={index}
                className={`text-slate-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-50 hover:text-ui_secondary1 bg-transparent rounded-md duration-500 ${
                  menu.gap ? "mt-9" : "mt-5"
                }  `}
                onClick={() => {
                  setActiveLink(index);
                  setMiniToggle(!miniToggle);
                  if (menu.onClick) {
                    menu.onClick();
                  }
                }}
              >
                <div
                  className={` md:h-4 md:w-4  ${
                    activeLink === index && "text-slate-400"
                  } `}
                >
                  {menu.src}
                </div>
                <span
                  className={`${
                    !miniToggle && "scale-0"
                  } duration-500 ease-in-out`}
                >
                  {" "}
                  {menu.title}{" "}
                </span>
              </Link>
            ))}

            <div
              className={`bg-[#fff] shadow-md rounded-md flex gap-2 justify-between px-3 py-0 items-center mt-8 md:hidden ${
                !miniToggle && "left-[-100%] duration-500 "
              } `}
            >
              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-transparent px-3 py-2 text-[0.8rem] font-poppins text-black placeholder-accent_3 "
              />

              <MdSearch className="text-ui_primary font-[900] h-5 w-5 cursor-pointer" />
            </div>
          </ul>
        </aside>
      )}
    </>
  );
}
