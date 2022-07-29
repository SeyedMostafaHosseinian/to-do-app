import React, { useContext, useEffect, useState ,useRef } from 'react';



//styles
import styles from "./Navbar.module.css";

//contexts
import { TodosContext } from './contexts/TodosContextProvider';

//icons
import github from "../assets/github.svg"

const Navbar = () => {
    const { todos,dispatch } = useContext(TodosContext)
    const [search,setSearch] = useState("")
    const changeHandler = (e) => {
        setSearch(e.target.value)
        dispatch({type:"SEARCH" ,  value:e.target.value})
    }
    const focusHandler = (e) => {
        dispatch({type:"SEARCH" , value:e.target.value})
    }
    useEffect(() => {
        dispatch({type:"SEARCH" , value:""})
        
    },[])

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <h2>todo-App</h2>
                <input onFocus={focusHandler} onChange={ changeHandler } value={search} type="text" placeholder='search todo' />
                <a href='#'><img src={github}  alt="github link" /></a>
            </div>
        </div>
    );
};

export default Navbar;