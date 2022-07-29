import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import AddTodo from './components/AddTodo';

//contexts
import TodosProvider from './components/contexts/TodosContextProvider';

const App = () => {
    return (
        <TodosProvider>
          <div className="main-container">
              <Navbar />
              <Switch>
                  <Route path="/"  component={Landing}/>
              </Switch>
          </div>
        </TodosProvider>
    );
};  

export default App;