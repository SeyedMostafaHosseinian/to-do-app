import React , {useReducer ,createContext} from 'react';



//helper functions
import { idGenerator , checkedItemIdFounder } from '../helper/functions';

//create context
export const TodosContext = createContext()

const TodosProvider = ({children}) => {
    if(!(!!localStorage.getItem("todos"))) {
        localStorage.setItem("todos",JSON.stringify({ items:[ ],checkedItems:[ ]}))
    }
    const initialState = {
        items:[],
        checkedItems:[],
        searchValue:""
    }
    const todosReducer = (state,action) => {
        switch(action.type) {
            case"ADD_TODOS" :

             if(!(!!localStorage.getItem("todos"))) {

                localStorage.setItem("todos",JSON.stringify({ items:[ ],checkedItems:[ ], searchValue:""}));
                state.items = JSON.parse(localStorage.getItem("todos")).items;
                state.checkedItems = localStorage.getItem("todos").checkedItems;
                state.searchValue = localStorage.getItem("todos").searchValue;
             }
             else {
                const todos=JSON.parse(localStorage.getItem("todos"))
                todos.items.push(action.payload)
                localStorage.setItem("todos",JSON.stringify(todos))
                state.items =JSON.parse(localStorage.getItem("todos")).items;
             }
             
             return {
                ...state,
             }
            case"LOAD":

             if(!(!!localStorage.getItem("todos"))) {
                localStorage.setItem("todos",JSON.stringify({ items:[ ],checkedItems:[ ],searchValue:"" }));
                state.items = localStorage.getItem("todos").items;
                state.checkedItems = localStorage.getItem("todos").checkedItems;
                state.searchValue = localStorage.getItem("todos").searchValue;
             }
             else {
                state = JSON.parse(localStorage.getItem("todos"))
                let compeletedIds = []
                state.checkedItems.map(item => compeletedIds.push(item.id))
             }
             return {
                ...state
             }
            case"CLEAR":
             let todos = JSON.parse(localStorage.getItem("todos"))
             todos = {
                items : [],
                checkedItems:[],
                searchValue:""
             }
             localStorage.setItem("todos",JSON.stringify(todos))
             state = JSON.parse(localStorage.getItem("todos"))
             return {
                ...state
             }
            case"CHECKED" :

             let data = JSON.parse(localStorage.getItem("todos"))
             const newCheckedItem = data.items.find(item => item.id === action.id)
             data.checkedItems.push(newCheckedItem);
             localStorage.setItem("todos",JSON.stringify(data))
             state.checkedItems =JSON.parse(localStorage.getItem("todos")).checkedItems

             return {
                ...state,
                checkedItems:[...state.checkedItems]
             }
            case"UNCHECK":

              let local = JSON.parse(localStorage.getItem("todos"))
              const unCheckItemIndex = local.checkedItems.findIndex(item => item.id === action.id)
              local.checkedItems.splice(unCheckItemIndex,1)
              localStorage.setItem("todos",JSON.stringify(local))
              state.checkedItems = JSON.parse(localStorage.getItem("todos")).checkedItems
              
              return {
                ...state,
                checkedItems:[...state.checkedItems]
              }
            case"REMOVE_TODO" : 

             let todosData = JSON.parse(localStorage.getItem("todos"))
             todosData.items = todosData.items.filter(item => item.id !== action.id) 
             todosData.checkedItems = todosData.checkedItems.filter(item => item.id !== action.id)
             localStorage.setItem("todos",JSON.stringify(todosData))
             state.items = JSON.parse(localStorage.getItem("todos")).items
             state.checkedItems = JSON.parse(localStorage.getItem("todos")).checkedItems
             
             return {
                ...state,
                items:[...state.items],
                checkedItems:[...state.checkedItems]
             }
            case"SEARCH":
             state.searchValue = action.value
             return {
                ...state,
             }
            case"CHANGE_TITLE":

             let getLocalData =JSON.parse(localStorage.getItem("todos"))
             let focusedItem =  getLocalData.items.find(item => item.id === action.id)
             
             focusedItem.title = action.title
             localStorage.setItem("todos",JSON.stringify(getLocalData))
             state.items = JSON.parse(localStorage.getItem("todos")).items
             
             return {
                ...state,
                items:[...state.items]
             }
            case"FILTER":
             let compeletedIds = [ ]
             state.checkedItems.map(item => compeletedIds.push(item.id))

             if(action.filterType === "all") {
               state.items = JSON.parse(localStorage.getItem("todos")).items
             }
             else if(action.filterType === "compeleted") {
               state.items = state.checkedItems;
             }
             else if(action.filterType === "uncompleted") {
               let items_1 = JSON.parse(localStorage.getItem("todos")).items;
               let checkedItems_1 = JSON.parse(localStorage.getItem("todos")).checkedItems;
               let checkedItemsIds_1 = []
               checkedItems_1.map(item => checkedItemsIds_1.push(item.id))
               
               const uncompletedItems_1 = items_1.filter(item => item.id !== checkedItemIdFounder(item.id,checkedItemsIds_1))
               state.items = uncompletedItems_1
            }
             return {
               ...state,
               items:[...state.items]
            } 
             default:
               return state
        }
    }
    const[todos,dispatch] = useReducer(todosReducer,initialState)
    idGenerator(todos.items)
    return (
        
        <TodosContext.Provider value={{todos,dispatch}}>
            {children}
        </TodosContext.Provider>    
        
    );
};

export default TodosProvider;