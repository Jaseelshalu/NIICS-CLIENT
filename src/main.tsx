import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.tsx';
import Admin from './components/Admin.tsx';
import { ContactDetails } from './components/ContactDetails.tsx';
import Error from './components/Error.tsx';
import { ExamCenter } from './components/ExamCenter.tsx';
import { PersonalInfo } from './components/PersonalInfo.tsx';
import { UploadDocuments } from './components/UploadDocuments.tsx';
import ViewDetailedApplicant from './components/applicant/ViewDetailedApplicant.tsx';
import { default as ErrorMessage, default as ErrorMessageEdit } from './components/applicant/edit/ApplicationError.tsx';
import SuccessMessage from './components/applicant/edit/ApplicationSuccess.tsx';
import ContactDetailsEdit from './components/applicant/edit/ContactDetails.tsx';
import EditApplicant from './components/applicant/edit/EditApplicant.tsx';
import ExamCenterEdit from './components/applicant/edit/ExamCenter.tsx';
import PersonalInfoEdit from './components/applicant/edit/PersonalInfo.tsx';
import EditPreview from './components/applicant/edit/Preview.tsx';
import UploadDocumentsEdit from './components/applicant/edit/UploadDocuments.tsx';
import PreviewApplicationDetails from './components/apply/Preview.tsx';
import './index.css';
import Apply from './routes/Apply.tsx';
import Approval from './routes/Approval.tsx';
import CandidateLogin from './routes/CandidateLogin.tsx';
import CandidateProfile from './routes/CandidateProfile.tsx';
import CredentialManagementPage from './routes/Credentials.tsx';
import ApplicationVerificationPage from './routes/ExamCenterDashboard.tsx';
import ExamCenters from './routes/ExamCenters.tsx';
import Institutions from './routes/Institutions.tsx';
import LoginPage from './routes/Login.tsx';
import MarkColumns from './routes/MarkColumns.tsx';
import MarksEntryPage from './routes/MarkEntry.tsx';
import AdminSettings from './routes/Settings.tsx';
import AdminProtected from './routes/protected/Admin.tsx';
import ExamCenterProtected from './routes/protected/ExamCenter.tsx';

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
        element: <EditPreview />,
        errorElement: <Error />,
      },
      {
        path: "success-message",
        element: <SuccessMessage />,
        errorElement: <Error />,
      },
      {
        path: "error-message",
        element: <ErrorMessageEdit />,
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
            path: "verification",
            element: <ApplicationVerificationPage />,
            errorElement: <Error />,
          },
          {
            path: "marks-entry",
            element: <MarksEntryPage />,
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
