'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle2, Circle, Edit, MoreHorizontal, Download } from "lucide-react"
import { motion } from "framer-motion"

export default function CandidateProfile() {

  const candidate = {
    name: "John Doe",
    phone: "+91 9876543210",
    aadhar: "1234 5678 9012",
    dob: "1990-01-01",
    guardianName: "Jane Doe",
    guardianAadhar: "9876 5432 1098",
  }

  const profileUrl = "/placeholder.svg?height=200&width=200"

  const timelineSteps = [
    { label: "Applied", completed: true, date: "2023-05-15" },
    { label: "Accepted", completed: true, date: "2023-05-20" },
    { label: "Hall Ticket Downloaded", completed: true, date: "2023-05-25" },
    { label: "Payment", completed: true, date: "2023-05-30" },
    { label: "Verification", completed: false, date: "2023-06-05" },
    { label: "Result Published", completed: false, date: "2023-06-15" },
    { label: "Admit Card Downloaded", completed: false, date: "2023-06-20" },
  ]

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden bg-gradient-to-br from-background to-secondary">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 bg-background/50 ">
            <h2 className="text-2xl font-bold text-primary">Candidate Profile</h2>
  
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 p-6">
            <div className="flex-shrink-0 w-full sm:w-auto">
              <img
                src={profileUrl}
                alt="Candidate"
                width={200}
                height={200}
                className="rounded-lg object-cover w-full sm:w-[200px] h-[200px] ring-2 ring-primary/20"
              />
            </div>
            <div className="flex-grow space-y-2 text-sm sm:text-base">
              <p><strong className="font-medium">Name:</strong> {candidate.name}</p>
              <p><strong className="font-medium">Phone:</strong> {candidate.phone}</p>
              <p><strong className="font-medium">Aadhar Number:</strong> {candidate.aadhar}</p>
              <p><strong className="font-medium">Date of Birth:</strong> {candidate.dob}</p>
              <p><strong className="font-medium">Guardian Name:</strong> {candidate.guardianName}</p>
              <p><strong className="font-medium">Guardian Aadhar:</strong> {candidate.guardianAadhar}</p>
            </div>
          </CardContent>
          <CardFooter className="bg-background/50  flex flex-wrap gap-2 justify-center sm:justify-start">
            <Button variant="default">
              <Edit className="mr-2 h-4 w-4" /> Edit Application
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" /> Download Hall Ticket
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" /> Download Admit Card
            </Button>
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
            <h3 className="text-xl font-semibold text-primary">Admission Timeline</h3>
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
                    <h3 className={`text-sm sm:text-base font-medium leading-tight ${step.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.label}
                    </h3>
                    <time className="block mb-2 text-xs font-normal leading-none text-muted-foreground">{step.date}</time>

                  </div>
                </motion.li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}