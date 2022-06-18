import React, { useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import Home from "../../pages/home";

import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";

export default function Header() {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const allMenu = useRef(null);
  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  const userMenu = useRef(null);
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  //retrieving user data data from cookie
  let { user } = useSelector((user) => ({ ...user }));
  user = user.data;
  console.log("redux test", user);

  const color = "#65676";

  return (
    <header>
      <div class="header_left">
        <Link to="/" className="header_logo">
          <div class="circle">
            <Logo></Logo>
          </div>
        </Link>

        <div
          class="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search></Search>
          <input
            type="text"
            placeholder="search"
            className="hide_input"
          ></input>
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      <div class="header_middle">
        <Link to="/" className="middle_icon hover1">
          <HomeActive color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div class="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div class="header_right">
        <Link className="profile_link hover1" to={"/profile"}>
          <img src={user?.picture} alt=""></img>
          <span>{user?.first_name}</span>
        </Link>
        <div
          class={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          onClick={() => {
            setShowAllMenu(!showAllMenu);
          }}
          ref={allMenu}
        >
          <Menu />
          {showAllMenu && <AllMenu />}
        </div>
        <div class={`circle_icon hover1`}>
          <Messenger />
        </div>
        <div class="circle_icon hover1">
          <Notifications />
          <div class="right_notification">5</div>
        </div>
        <div class={`circle_icon hover1 ${showUserMenu && "active_header"}`} ref={userMenu}>
          <div
            onClick={() => {
              setShowUserMenu(!showUserMenu);
            }}
          >
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
