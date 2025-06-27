import { lazy } from 'react';

import RequireAuth from '@components/RequireAuth';
import DashboardLayout from '@layout/Dashboard';
import Loadable from '@components/Loadable';

const CodePage = Loadable(lazy(() => import('@pages/commons/Code')));

const CommonRoutes = {
  path: '/',
    element: (
      <RequireAuth>
          <DashboardLayout />
      </RequireAuth>
    ),
    children: [
        {
            path: '/code',
            element: <CodePage />
        },
    ]
};

export default CommonRoutes;