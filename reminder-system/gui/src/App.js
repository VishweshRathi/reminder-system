import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import Aux from './hoc/Aux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import AddReminder from './components/Add_Reminder/Add_Reminder';
import ShowReminders from './components/Show_Reminders/Show_Reminders';

class App extends Component {
  render() {
    return (
      <Aux>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path= "/home" component={Home} />
              <Route path= "/add_reminder" component={AddReminder} />
              <Route path= "/show_reminder" component={ShowReminders} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Aux>
    );
  }
}

export default App;
