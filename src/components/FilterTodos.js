import React, { useContext, useEffect, useState } from 'react';

//styles
import styles from "./FilterTodos.module.css";

//contexts
import { TodosContext } from './contexts/TodosContextProvider';


const FilterTodos = () => {
    const{dispatch} = useContext(TodosContext)
    const[filters,setFilters] = useState("all")
    const filterChangeHandler = event => {
        setFilters(event.target.value)
        if(event.target.value === "uncompleted" ) {
            
            dispatch({type:"FILTER" , filterType:event.target.value})
        }
        else {
            
            dispatch({type:"FILTER" , filterType:event.target.value})
        }
    }
    

    return (
        <div className={styles.container} >
            <h4>filter by :</h4>
            <div className={styles.filterButtons}>
                <button className={filters === "all" ? styles.activeButton : null} onClick={filterChangeHandler} value="all" name="all">all</button>
                <button className={filters === "compeleted" ? styles.activeButton : null} onClick={filterChangeHandler} value="compeleted" name="compeleted">compeleted</button>
                <button className={filters === "uncompleted"? styles.activeButton : null} onClick={filterChangeHandler} value="uncompleted" name="uncompleted">uncompleted</button>
            </div>
            
        </div>
    );
};

export default FilterTodos;