import React, { useContext, useState,useRef, useEffect } from 'react';


///contexts
import { TodosContext } from './contexts/TodosContextProvider';


//style
import styles from "./TodosCard.module.css"

//icons
import check from "../assets/check.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import arrowRight from "../assets/arrow-right.svg"

const TodosCard = (props) => { 
    const editorInput = useRef(null)
    const [edited,setEdit] = useState(true)
    const { todos,dispatch } = useContext(TodosContext)
    const { title } = props.data
    const { id } = props;
    const [editInput,setEditInput] = useState(title)

    const editHandler = () => {
        setEdit(!edited)
        
    }
    useEffect(() => {
        if(editorInput.current) {
            editorInput.current.focus()

        }
    },[edited])
    const inputEditChangeHandler = (e) => {

        setEditInput(e.target.value)
    }
    const editSubmitHandler = (e) => {
        e.preventDefault()
        setEdit(!edited)
        
        dispatch({type:"CHANGE_TITLE" , id , title:editInput})
    }
    return (
             <>
             {
                edited 

                ?

                <div className={todos.checkedItems.find(item => item.id === id) ? styles.checked : styles.boxTodo}>
                  
                  <h2 className={todos.checkedItems.find(item => item.id === id) && styles.checkedTitle }>{title}</h2>

                  <div className={styles.buttonsContainer}>

                    {todos.checkedItems.find(item => item.id === id) 
                    ? 
                    <button onClick={() => dispatch({ type:"UNCHECK"   ,id })} className={styles.checkButton}><img src={check} alt="check"/></button>
                    :
                    <button onClick={() => dispatch({ type:"CHECKED"   ,id })} className={styles.checkButton}><img src={check} alt="check"/></button>
                    }
                    <button onClick={() => dispatch({ type:"REMOVE_TODO" ,id })} className={styles.trashButton}><img src={trash} alt="check"/></button>
                    
                    <button onClick={editHandler} className={styles.editButton}><img src={edit} alt="check"/></button>
                  
                  </div>
                
                </div> 

                :

                <form onSubmit={editSubmitHandler} className={todos.checkedItems.find(item => item.id === id) ? styles.checked : styles.boxTodo}>

                 <input ref={editorInput} onChange={inputEditChangeHandler} className={ styles.editInput } placeholder="Write..." value={editInput} type="text" />
                   
                   <div className={styles.buttonsContainerEditPosition}>
                   
                      <button type="submit"  className={styles.editButton}><img src={check} alt="check"/></button>
                      
                      <button onClick={editHandler}  className={styles.backButton}><img src={arrowRight} alt="check"/></button>
                   
                   </div>

                </form>
                
             }

             </>
    )
};

export default TodosCard;