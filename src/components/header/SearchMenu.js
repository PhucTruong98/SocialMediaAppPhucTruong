import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
import { useEffect, useRef, useState } from "react";
export default function SearchMenu({ color, setShowSearchMenu }) {

  
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  })

  return (
    <div class="header_left search_area scrollbar" ref={menu}>
      <div class="search_wrap">
        <div class="header_logo">
          <div
            class="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return />
          </div>
        </div>
        <div
          class="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && <div>
            <Search color={color} />
          </div>}
          <input 
          type="text" 
          placeholder="Search Facebook" 
          ref={input} 
          onFocus={() => {
            setIconVisible(false);
          }}
          onBlur={() => {
            setIconVisible(true);
          }}
          ></input>
        </div>
      </div>
      <div class="search_history_header">
        <span>Recent Searches</span>
        <a href="">Edit</a>
      </div>
      <div class="search_history">
        <div class="search_results scrollbar"></div>
      </div>
    </div>
  );
}
