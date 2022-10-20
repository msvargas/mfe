import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const AuthLazy = React.lazy(() => import("./components/AuthApp"));
const MarketingLazy = React.lazy(() => import("./components/MarketingApp"));

export default () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={()=>setIsSignedIn(false)} />
          <React.Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </React.Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
