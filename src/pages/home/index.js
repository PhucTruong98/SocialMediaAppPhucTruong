import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref } from 'yup';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import useClickOutside from '../../helpers/clickOutside';
import './styles.css';


export default function Home() {


  let {user} = useSelector((user) => ({...user}));

  user = user.data;

  return (
    <div className='home'>
        <Header></Header>
        <LeftHome user={user}/>
        <div class="home_middle">
          <Stories/>
          <CreatePost user={user}/>
        </div>
        <RightHome user={user}/>

    </div>
  )
}
