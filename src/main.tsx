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
import  PersonalInfoEdit  from './components/applicant/edit/PersonalInfo.tsx';
import  ContactDetailsEdit  from './components/applicant/edit/ContactDetails.tsx';
import  ExamCenterEdit  from './components/applicant/edit/ExamCenter.tsx';
import  UploadDocumentsEdit  from './components/applicant/edit/UploadDocuments.tsx';
import AdminSettings from './routes/Settings.tsx';
import ExamCenters from './routes/ExamCenters.tsx';
import MarksEntryPage from './routes/MarkEntry.tsx';
import Admin from './components/Admin.tsx';
import MarkColumns from './routes/MarkColumns.tsx';
import ExamCenterDashboard from './routes/ExamCenterDashboard.tsx';
import PreviewApplicationDetails from './components/apply/Preview.tsx';
import CredentialManagementPage from './routes/Credentials.tsx';
import  SuccessMessage  from './components/applicant/edit/ApplicationSuccess.tsx';
import ErrorMessage from './components/applicant/edit/ApplicationError.tsx';
import Approval from './routes/Approval.tsx';
import Institutions from './routes/Institutions.tsx';
import ExamCenterProtected from './routes/protected/ExamCenter.tsx';
import AdminProtected from './routes/protected/Admin.tsx';
import ViewDetailedApplicant from './components/applicant/ViewDetailedApplicant.tsx';
import EditApplicant from './components/applicant/edit/EditApplicant.tsx';

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
    path: "/view-detailed-applicant",
    element: <ViewDetailedApplicant />,
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
      },
      {
        path: "success-message",
        element: <SuccessMessage />,
        errorElement: <Error />,
      },
      {
        path: "error-message",
        element: <ErrorMessage />,
        errorElement: <Error />,
      },
    ]
  },
  {
    path: "/edit-application",
    element: <EditApplicant />,
    errorElement: <Error />,
    children: [
      {
        path: "personal-details",
        element: <PersonalInfoEdit />,
        errorElement: <Error />,
      },
      {
        path: "contact-details",
        element: <ContactDetailsEdit />,
        errorElement: <Error />,
      },
      {
        path: "exam-center",
        element: <ExamCenterEdit />,
        errorElement: <Error />,
      },
      {
        path: "upload-documents",
        element: <UploadDocumentsEdit />,
        errorElement: <Error />,
      },
      {
        path: "preview",
        element: <PreviewApplicationDetails />,
        errorElement: <Error />,
      },
      {
        path: "success-message",
        element: <SuccessMessage />,
        errorElement: <Error />,
      },
      {
        path: "error-message",
        element: <ErrorMessage />,
        errorElement: <Error />,
      },
    ]
  },
  {
    element: <ExamCenterProtected />,
    children: [
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
      },
    ]
  },
  {
    element: <AdminProtected />,
    children: [
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
            path: "marks-columns",
            element: <MarkColumns />,
            errorElement: <Error />,
          },
          {
            path: "exam-centers",
            element: <ExamCenters />,
            errorElement: <Error />,
          },
          {
            path: "institutions",
            element: <Institutions />,
            errorElement: <Error />,
          },
          {
            path: "marks-entry",
            element: <MarksEntryPage />,
            errorElement: <Error />,
          },
          {
            path: "credentials",
            element: <CredentialManagementPage />,
            errorElement: <Error />,
          },
          {
            path: "approval",
            element: <Approval />,
            errorElement: <Error />,
          },
        ]
      }
    ]
  },
  // {
  //   path: "/admin",
  //   element: <Admin />,
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       path: "settings",
  //       element: <AdminSettings />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "marks-list",
  //       element: <MarkColumns />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "exam-centers",
  //       element: <ExamCenters />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "institution-lists",
  //       element: <Institutions />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "marks-entry",
  //       element: <MarksEntryPage />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "credentials",
  //       element: <CredentialManagementPage />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "approval",
  //       element: <Approval />,
  //       errorElement: <Error />,
  //     },
  //   ]
  // },
  // {
  //   path: "/exam-center",
  //   element: <Outlet />,
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <ExamCenterDashboard />,
  //       errorElement: <Error />,
  //     },
  //   ]
  // }

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
