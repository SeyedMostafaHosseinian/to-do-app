import React, { useContext,useEffect} from 'react';
import TodosCard from './TodosCard';

//styles
import styles from "./TodosList.module.css";

//contexts
import { TodosContext } from './contexts/TodosContextProvider';

//helper functions
import { getDataSearchValue } from './helper/functions';

const TodosList = () => {

  const{todos,dispatch} = useContext(TodosContext)

  useEffect(() => {

    dispatch({ type:"LOAD" })

  },[])
  
  const search = todos.items.filter(item => getDataSearchValue(item,todos.searchValue) )
  
    return (

        <div className={ styles.container }>

            <div className={styles.todosList}>
                {search.length === 0 ?

                    todos.items !== undefined && todos.items.length > 0  && todos.items.map(item => <TodosCard key={item.id} id={item.id} data={item} />) 
                    :
                    todos.items !== undefined && todos.items.length > 0  && search.map(item => <TodosCard key={item.id} id={item.id} data={item} />) 
                }
            
            </div>

        </div>
    );
};

export default TodosList;