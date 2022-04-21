import React, { Suspense } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import LoginPage from "./views/LoginPage/LoginPage"
import RegisterPage from "./views/RegisterPage/RegisterPage"
import Footer from "./views/Footer/Footer"
import NavBar from "./views/NavBar/NavBar"
import NotFound from "./views/NotFound"
import Profile from './views/ProfilePage/ProfilePage'
import Setting from './views/ProfilePage/Setting'
import BookmarkPage from "./views/FavoritePage/FavoritePage"
import Auth from "./auth"
import LandingPage from "./views/LandingPage/LandingPage"
import UploadRecipePage from './views/UploadRecipePage/UploadRecipePage'
import DetailRecipePage from './views/DetailRecipePage/DetailRecipePage'
import EditRecipePage from './views/EditRecipePage/EditRecipePage'
import axios from 'axios';

axios.defaults.baseURL = 'https://recipepad.azurewebsites.net/';

//axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
        <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
              <Route exact path="/Home" component={Auth(Home, null)} />
              <Route exact path="/">
                <Redirect to="/Home" />
              </Route>
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/recipe" component={Auth(LandingPage, false)} />
              <Route exact path="/profile" component={Auth(Profile, true)} />
              <Route exact path="/settings" component={Auth(Setting, true)} />
              <Route exact path="/bookmark" component={Auth(BookmarkPage, null)} />
              <Route exact path="/recipe/upload" component={Auth(UploadRecipePage, true)} />
              <Route exact path="/recipe/:recipeId" component={Auth(DetailRecipePage, null)} />
              <Route exact path="/recipe/edit/:recipeId" component={Auth(EditRecipePage, true)} />
              <Route component={NotFound}/>
          </Switch>
        </div>
        <Footer />
    </Suspense>
  );
}

export default App;
