import ThemeCustomization from '@themes';
import ScrollTop from '@components/ScrollTop';
import router from '@routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store';

function App() {

  return (
    <Provider store={store}>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </Provider>
  )
}

export default App
