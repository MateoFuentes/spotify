import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { Dashboard } from './pages/dashboard/Dashboard'
import ProtectedRoute from './routes/Protected';
import { AuthProvider } from './auth/authProvider';
import { Search } from './components/search/Search.tsx';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <App />
    },
    {
      path:"/",
      element: <ProtectedRoute />,
      children: 
      [
        {
          path:'Dashboard',
          element: <Dashboard />,
          children:
          [
            {
              path:'Search',
              element:  <Search />
            }
          ]
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider  router={router}/>
  </AuthProvider>
)
