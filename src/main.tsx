import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Error from './components/Error.tsx';
import LoginPage from './routes/Login.tsx';
import CandidateLogin from './routes/CandidateLogin.tsx';
import CandidateProfile from './routes/CandidateProfile.tsx';
import Apply from './routes/Apply.tsx';
import { PersonalInfo } from './components/PersonalInfo.tsx';
import { ContactDetails } from './components/ContactDetails.tsx';
import { ExamCenter } from './components/ExamCenter.tsx';
import { UploadDocuments } from './components/UploadDocuments.tsx';
import AdminSettings from './routes/Settings.tsx';
import ExamCentersPage from './routes/ExamCenterList.tsx';
import InstitutionListsPage from './routes/InstitutionLists.tsx';
import MarksEntryPage from './routes/MarkEntry.tsx';
import Admin from './components/Admin.tsx';
import MarkListPage from './routes/MarkLists.tsx';
import ExamCenterDashboard from './routes/ExamCenter.tsx';
import PreviewApplicationDetails from './components/apply/Preview.tsx';

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
    children: [
      {
        path: "personal-details",
        element: <PersonalInfo />,
        errorElement: <Error />,
      },
      {
        path: "contact-details",
        element: <ContactDetails />,
        errorElement: <Error />,
      },
      {
        path: "exam-center",
        element: <ExamCenter />,
        errorElement: <Error />,
      },
      {
        path: "upload-documents",
        element: <UploadDocuments />,
        errorElement: <Error />,
      },
      {
        path: "preview",
        element: <PreviewApplicationDetails />,
        errorElement: <Error />,
      }

    ]
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        path: "settings",
        element: <AdminSettings />,
        errorElement: <Error />,
      },
      {
        path: "marks-list",
        element: <MarkListPage />,
        errorElement: <Error />,
      },
      {
        path: "exam-centers",
        element: <ExamCentersPage />,
        errorElement: <Error />,
      },
      {
        path: "institution-lists",
        element: <InstitutionListsPage />,
        errorElement: <Error />,
      },
      {
        path: "marks-entry",
        element: <MarksEntryPage />,
        errorElement: <Error />,
      },
    ]
  },
  {
    path: "/exam-center",
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: <ExamCenterDashboard />,
        errorElement: <Error />,
      },
    ]
  }

]);

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
