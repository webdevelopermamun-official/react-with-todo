import { FaBarsStaggered, FaListCheck, FaArrowsTurnToDots, FaArrowRightFromBracket } from "react-icons/fa6";import { LuShieldQuestion } from "react-icons/lu";

import { IoIosSearch } from "react-icons/io";
import { FaAngleDoubleRight, FaTrashAlt } from "react-icons/fa";
import { BsCalendarWeek, BsBagCheck, BsSliders} from "react-icons/bs";
import { TbClockQuestion } from "react-icons/tb";
import { MdLibraryBooks } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { TbArrowsRight } from "react-icons/tb";

import "./NavBar.scss"
import { useContext, useState } from "react";
import TodayContext from "../../context/TodayContext";
import WeekContext from "../../context/WeekContext";
import axios from "axios";




const NavBar = ({navSideBar, setNavSideBar}) => {

  // get today data lenght form contact
  const {todayDataGet, complitedData, trashData, notComplitedData} = useContext(TodayContext);
  const {weekDataGet, weekComplitedData, weekNotComplitedData, weekTrashData} = useContext(WeekContext);



  return (
    <>
        {
            navSideBar ?
            <div className="left_side_menu_bar">
                <div className="toggole_nav d-flex justify-content-between align-items-center pb-4">
                    <h2>Menu</h2>
                    <span onClick={() => setNavSideBar(false)}><FaBarsStaggered /></span>
                </div>
                <div className="search_bar mb-4">
                    <span><IoIosSearch /></span>
                    <input type="search" placeholder="Search" />
                </div>
                <div className="tast_list_items">
                    <h5>TASKS</h5>
                    <ul>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="/">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <FaAngleDoubleRight />
                                    <span>Dashboard</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="today">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <FaListCheck />
                                    <span>Today</span>
                                </div>
                                <p>{todayDataGet.length}</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="this-weeek">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <BsCalendarWeek />
                                    <span>This Week</span>
                                </div>
                                <p>{weekDataGet.length}</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="completed">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <BsBagCheck />
                                    <span>Completed</span>
                                </div>
                                <p>{complitedData.length + weekComplitedData.length}</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="not-completed">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <TbClockQuestion />
                                    <span>Not Completed</span>
                                </div>
                                <p>{weekNotComplitedData.length + notComplitedData.length}</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="trash">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <FaTrashAlt />
                                    <span>Trash</span>
                                </div>
                                <p>{trashData.length + weekTrashData.length}</p>
                            </NavLink>
                        </li>
                    </ul>

                    <h5 className="pt-4">IMPORTANT NOTE</h5>
                    <ul>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="notes">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <MdLibraryBooks />
                                    <span>Notes</span>
                                </div>
                                <p>10</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="d-flex justify-content-between align-items-center" to="any-query">
                                <div className="nav_item d-flex gap-3 align-items-center">
                                    <LuShieldQuestion  />
                                    <span>Ask Any Query</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="nav_footer">
                        <li>
                            <NavLink to="setting" className="nav_item d-flex gap-3 align-items-center">
                                <BsSliders />
                                <span>Settings</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="signout" className="nav_item d-flex gap-3 align-items-center">
                                <FaArrowRightFromBracket />
                                <span>Sign Out</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div> :
                <div className="left_side_menu_bar toggole_nav_bar_item">
                    <div className="toggole_nav d-flex justify-content-between align-items-center pb-4">
                        <h2>Menu</h2>
                        <span onClick={() => setNavSideBar(true)}><TbArrowsRight /></span>
                    </div>
                    <div className="tast_list_items">
                        <h5>TASKS</h5>
                        <ul>
                            <li>
                                <NavLink className="nav_item" to="/">
                                        <FaAngleDoubleRight title="DashBoard" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav_item" to="today">
                                    <FaListCheck title="Today" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav_item" to="this-weeek">
                                    <BsCalendarWeek title="This Week" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav_item" to="completed">
                                        <BsBagCheck title="Completed"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav_item" to="not-completed">
                                    <TbClockQuestion title="Not Completed" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav_item" to="trash">
                                    <FaTrashAlt title="Trash" />
                                </NavLink>
                            </li>
                        </ul>
        
                        <h5 className="pt-4">NOTE</h5>
                        <ul>
                            <li>
                                <NavLink className="nav_item d-flex gap-3 align-items-center" to="notes">
                                    <MdLibraryBooks title="Notes"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav_item d-flex gap-3 align-items-center" to="any-query">
                                    <LuShieldQuestion title="Ask Any Query" />
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="nav_footer">
                            <li>
                                <NavLink to="setting" className="nav_item">
                                    <BsSliders title="Settings" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="signout" className="nav_item">
                                    <FaArrowRightFromBracket title="Sign Out" />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>  
        }

    </>
  )
}

export default NavBar