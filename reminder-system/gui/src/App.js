import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import Aux from './hoc/Aux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'

class App extends Component {
  render() {
    return (
      <Aux>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path= "/home" component={Home} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Aux>
    );
  }
}

export default App;
