import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import Aux from './hoc/Aux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import AddReminder from './components/Add_Reminder/Add_Reminder';

class App extends Component {
  render() {
    return (
      <Aux>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path= "/home" component={Home} />
              <Route path= "/add_reminder" component={AddReminder} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Aux>
    );
  }
}

export default App;
