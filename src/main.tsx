import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Error from './components/Error.tsx';
import LoginPage from './routes/Login.tsx';
import CandidateLogin from './routes/CandidateLogin.tsx';
import CandidateProfile from './routes/CandidateProfile.tsx';
import Apply from './routes/Apply.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/check-status",
    element: <CandidateLogin />,
    errorElement: <Error />,
  },
  {
    path: "/my-profile",
    element: <CandidateProfile />,
    errorElement: <Error />,
  },
  {
    path: "/apply",
    element: <Apply />,
    errorElement: <Error />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <InitializeUser /> */}
      {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
        <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 2000,
        }}
      />
  </StrictMode>,
)
