import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
// import theme from './theme'


// https://github.com/mui-org/material-ui/issues/13394
// https://material-ui.com/customization/theming/#unstable-createmuistrictmodetheme-options-args-theme
const theme = unstable_createMuiStrictModeTheme();


ReactDOM.render(
  <React.StrictMode>
      <FirebaseContext.Provider value={new Firebase()}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
