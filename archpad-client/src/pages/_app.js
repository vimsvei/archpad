// global styles
import PropTypes from 'prop-types';

// styles
import 'scss/style.scss';
import 'styles/globals.css';

// third-party
import { Provider } from 'react-redux';

// project import
import NavigationScroll from 'layout/NavigationScroll';
import { store } from 'store';
import ThemeCustomization from 'themes';
import RTLLayout from 'components/ui-component/RTLLayout';
import Locales from 'components/ui-component/Locales';
import Snackbar from 'components/ui-component/extended/Snackbar';

import { ConfigProvider } from 'contexts/ConfigContext';

import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';

const Noop = ({ children }) => <> {children} </>;

Noop.propTypes = {
  children: PropTypes.node
};

// ==============================|| APP ||============================== //

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ConfigProvider>
        <ThemeCustomization>
          <RTLLayout>
            <Locales>
              <NavigationScroll>
                <AuthProvider>
                  <>
                    {getLayout(<Component {...pageProps} />)}
                    <Snackbar />
                  </>
                </AuthProvider>
              </NavigationScroll>
            </Locales>
          </RTLLayout>
        </ThemeCustomization>
      </ConfigProvider>
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default App;
