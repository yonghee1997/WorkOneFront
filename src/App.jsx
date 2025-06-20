import ThemeCustomization from '@themes';
import ScrollTop from '@components/ScrollTop';
import router from '@routes';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  )
}

export default App
