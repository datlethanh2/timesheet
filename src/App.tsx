import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from "./route/Route";
import { Provider } from 'react-redux';
import {store} from './redux/Store';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Provider store={store}>
              <Layout/>
            </Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
