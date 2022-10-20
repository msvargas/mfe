import React from "react";
import Header from "./components/Header";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from 'history'
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const AuthLazy = React.lazy(() => import("./components/AuthApp"));
const MarketingLazy = React.lazy(() => import("./components/MarketingApp"));
const DashboardLazy = React.lazy(()=>import('./components/DashboardApp'));

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  React.useEffect(()=>{
    if(isSignedIn){
      history.push('/dashboard')
    }else {
      history.push('/')
    }
  },[isSignedIn])
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={()=>setIsSignedIn(false)} />
          <React.Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy/>
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </React.Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
