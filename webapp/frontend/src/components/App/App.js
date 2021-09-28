// React
import React, { lazy, useEffect, Suspense } from "react";

// Router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Material
import {
  // Should be fixed in v5 release. See https://bit.ly/2Ali8Ak.
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Layout from "../Layout";
import Main from "../Main";
import AuthRedirect from "../AuthRedirect";

// Store
import { getToken } from "../../store/actions";

// Styles
import { LazyProgress } from "./App-styles";

// Code Splitting
const lazyComp = {
  Account: lazy(() => {
    return import("../Account");
  }),
  Alerts: lazy(() => {
    return import("../Alerts");
  }),
  Search: lazy(() => {
    return import("../Search");
  }),
  SignIn: lazy(() => {
    return import("../SignIn");
  }),
  SignUp: lazy(() => {
    return import("../SignUp");
  }),
  Wallet: lazy(() => {
    return import("../Wallet");
  }),
};

const App = () => {
  // Variables
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.data.token !== null);
  const isAuthInit = useSelector((state) => state.auth.isInit);
  const palette = useSelector((state) => state.theme.palette);
  const theme = createMuiTheme({ palette: palette });

  // Hooks
  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  // JSX
  let routes = (
    <Switch>
      <Route path="/signin" component={lazyComp.SignIn} />
      <Route path="/signup" component={lazyComp.SignUp} />
      <Route path="/main" component={Main} />
      <Route from="/search/web" component={AuthRedirect} />
      <Route from="/search/wallet" component={AuthRedirect} />
      <Redirect from="/" to="/main" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/alerts" component={lazyComp.Alerts} />
        <Route path="/signin" component={lazyComp.SignIn} />
        <Route path="/signup" component={lazyComp.SignUp} />
        <Route path="/account" component={lazyComp.Account} />
        <Route path="/search/web" component={lazyComp.Search} />
        <Route path="/search/wallet" component={lazyComp.Search} />
        <Route path="/info/wallet" component={lazyComp.Wallet} />
        <Route path="/main" component={Main} />
        <Redirect from="/" to="/main" />
      </Switch>
    );
  }

  let layout = <LazyProgress />;
  if (isAuthInit) {
    layout = (
      <Layout>
        <Suspense fallback={<LazyProgress />}>{routes}</Suspense>
      </Layout>
    );
  }

  const view = (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout}
      </ThemeProvider>
    </BrowserRouter>
  );
  return view;
};

export default App;
