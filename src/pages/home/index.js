import React, { useRef, useState } from 'react';
import { ref } from 'yup';
import Header from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';

export default function Home() {

    const [visible, setVisible] = useState(true);
    const el = useRef(null);

    useClickOutside(el, () => {
        //el.current.style.display = "none";
        setVisible(false);
    });


  return (
    <div>
        <Header></Header>
        {visible && <div class="card" ref={el}></div>}
    </div>
  )
}
