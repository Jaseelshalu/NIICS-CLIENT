"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Circle,
  Edit,
  MoreHorizontal,
  Download,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import useApplicantStore from "@/store/applicantStore";
import { Applicant } from "@/types/types";
import { useNavigate } from "react-router-dom";

export default function CandidateProfile() {
  const { applicant, initialApplicantLoad } = useApplicantStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Candidate Profile";
    // take applicant data from local storage
    const applicant = JSON.parse(localStorage.getItem("applicant") as string);
    if (applicant) {
      initialApplicantLoad(applicant as Applicant);
    } else {
      navigate("/check-status");
    }
  }, []);

  const profileUrl =
    "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png";

  const timelineSteps = [
    {
      label: "Applied",
      completed: applicant?.applied,
      date: applicant?.appliedAt,
    },
    {
      label: "Accepted",
      completed: applicant?.accepted,
      date: applicant?.acceptedAt,
    },
    {
      label: "Hall Ticket Downloaded",
      completed: applicant?.hallticketDownloaded,
      date: applicant?.hallticketDownloadedAt,
    },
    { label: "Payment", completed: applicant?.paid, date: applicant?.paidAt },
    {
      label: "Verification",
      completed: applicant?.verified,
      date: applicant?.verifiedAt,
    },
    { label: "Result Published", completed: true, date: "" },
    {
      label: "Admit Card Downloaded",
      completed: applicant?.admitCardDownloaded,
      date: applicant?.admitCardDownloadedAt,
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden bg-gradient-to-br from-background to-secondary">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 bg-background/50 ">
            <h2 className="text-2xl font-bold text-primary">
              Candidate Profile
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 p-6">
            <div className="flex flex-shrink-0 w-full h-full sm:w-auto items-center justify-center">
              <img
                src={applicant?.imageURL || profileUrl}
                alt="Candidate"
                width={200}
                height={200}
                className="rounded-lg   w-[200px] h-[200px] ring-2 ring-primary/20"
              />
            </div>
            <div className="flex-grow space-y-2 text-sm sm:text-base">
              <p>
                <strong className="font-medium">Ref No:</strong>{" "}
                {applicant?.refNumber}
              </p>
              {applicant?.rollNumber && applicant.accepted && (
                <p>
                  <strong className="font-medium">Roll Number:</strong>{" "}
                  {applicant?.rollNumber}
                </p>
              )}
              <p>
                <strong className="font-medium">Name:</strong> {applicant?.name}
              </p>
              <p>
                <strong className="font-medium">Phone:</strong>{" "}
                {applicant?.whatsapp}
              </p>
              <p>
                <strong className="font-medium">Aadhar Number:</strong>{" "}
                {applicant?.aadharNumber}
              </p>
              <p>
                <strong className="font-medium">Date of Birth:</strong>{" "}
                {applicant?.dob.toString()}
              </p>
              <p>
                <strong className="font-medium">Guardian Name:</strong>{" "}
                {applicant?.guardiansName}
              </p>
              <p>
                <strong className="font-medium">Email:</strong>{" "}
                {applicant?.email}
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-background/50  flex flex-wrap gap-2 justify-center sm:justify-start">
            {!applicant?.accepted && (
              <Button onClick={
                () => navigate('/edit-application/personal-details/')
              } variant="default">
                <Edit className="mr-2 h-4 w-4" /> Edit Application
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => navigate("/view-detailed-applicant")}
            >
              <Eye className="mr-2 h-4 w-4" /> View Application
            </Button>
            {applicant?.accepted && (
              <Button variant="default">
                <Download className="mr-2 h-4 w-4" /> Download Hall Ticket
              </Button>
            )}
            {applicant?.institution && (
              <Button variant="secondary">
                <Download className="mr-2 h-4 w-4" /> Download Admit Card
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-background to-secondary">
          <CardHeader className="bg-background/50 ">
            <h3 className="text-xl font-semibold text-primary">
              Admission Timeline
            </h3>
          </CardHeader>
          <CardContent className="p-6">
            <ol className="relative border-l-2 border-primary/20 ml-3 space-y-6 py-2">
              {timelineSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className="ml-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-10 ring-4 ring-background z-30">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500" />
                    )}
                  </span>
                  <div
                    className={`p-4 bg-card backdrop-blur-sm rounded-lg shadow-sm border border-primary/10 `}
                  >
                    <h3
                      className={`text-sm sm:text-base font-medium leading-tight ${
                        step.completed
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                      <span>
                        {step.date && (
                          <time className="block mt-2 text-xs font-normal leading-none text-muted-foreground">
                            {new Date(step.date).toLocaleDateString()}
                          </time>
                        )}
                      </span>
                    </h3>
                    <time className="block mb-2 text-xs font-normal leading-none text-muted-foreground">
                      {}
                    </time>
                  </div>
                </motion.li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
