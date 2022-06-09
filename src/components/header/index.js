import React from 'react'
import "./styles.css";
import { Link } from 'react-router-dom';
import {Logo, Search} from '../../svg';

export default function Header() {
  return (
      <header>
          <div class="header_left">
              <Link to="/" className='header_logo'>
                  <div class="circle">
                      <Logo ></Logo>
                  </div>
              </Link>
              <div class="search search1">
                  <Search></Search>
                  <input type="text" placeholder="search" className="hide_input"></input>
              </div>
          </div>
          <div class="header_middle"></div>
          <div class="header_right"></div>
      </header>
    
  )
}
