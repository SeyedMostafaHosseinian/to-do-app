import React, { useContext, useState } from 'react';

//styles
import styles from "./AddTodo.module.css";

//contexts
import { TodosContext } from './contexts/TodosContextProvider';
import FilterTodos from './FilterTodos';
import { idGenerator } from './helper/functions';

const AddTodo = () => {

    const {todos,dispatch} = useContext(TodosContext)
    const [inputData,setInputData] = useState({
        title:"",
        id:idGenerator(todos.items)
    })
    const changeHandler = event => {
        setInputData({
            ...inputData,
            [event.target.name]:event.target.value,
            id:idGenerator(todos.items)
        })
    }
    const submitHandler = event => {
        event.preventDefault()
        if(inputData.title.trim().length > 0) {
            dispatch({type:"ADD_TODOS" , payload:inputData})
            setInputData({
                title:"",
                id:idGenerator(todos.items)
            })
        }
    }
    const clearHandler =() => {
        dispatch({type:"CLEAR"})
    }
    return (
       <div className={styles.AddTodoParent}>
        <div className={styles.todoContainer}>
            <form onSubmit={submitHandler}>
                <input value={inputData.title} name="title" type="text" placeholder='title...'  onChange={changeHandler}/>
                <button type="submit">Add Todo</button>
            </form>
                <button onClick={clearHandler}>clear all</button>
            {<FilterTodos/>}    
        </div>
       </div> 
    );
};

export default AddTodo;
