import { createBrowserRouter } from 'react-router';
import { ComponentsPage } from './pages/components';
import { DirectoriesPage } from './pages/directories';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ComponentsPage,
  },
  {
    path: '/application/components',
    Component: ComponentsPage,
  },
  {
    path: '/directories',
    Component: DirectoriesPage,
  },
  {
    path: '*',
    Component: () => (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">404</h1>
          <p className="text-muted-foreground">Страница не найдена</p>
        </div>
      </div>
    ),
  },
]);