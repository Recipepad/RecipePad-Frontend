import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import LoginPage from "./views/LoginPage/LoginPage"
import RegisterPage from "./views/RegisterPage/RegisterPage"
import Footer from "./views/Footer/Footer"
import NavBar from "./views/NavBar/NavBar"

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </div>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
