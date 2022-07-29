import React from 'react';

//components
import AddTodo from './AddTodo';
import TodosList from './TodosList';

//styles
import styles from "./Landing.module.css";

const Landing = () => {
    return (
        <div className={styles.landing}>
           <div className={styles.column1}>
             {<TodosList />}

           </div> 
           <div className={styles.column2}> 
             {<AddTodo />}
            
           </div> 
        </div>
    );
};

export default Landing;