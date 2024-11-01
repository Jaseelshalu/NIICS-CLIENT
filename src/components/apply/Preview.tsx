'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { User, Calendar, Image, Users, CreditCard, MapPin, Phone, Mail, Building, FileText, Send, Edit } from "lucide-react"

interface Institution {
  name: string;
}

interface ApplicationDetails {
  name: string;
  dob: Date;
  imageURL: string;
  fathersName: string;
  guardiansName: string;
  aadharNumber: string;
  state: string;
  district: string;
  village: string;
  postOffice: string;
  policeStation: string;
  pinCode: string;
  whatsapp: string;
  alternativeNumber: string;
  email: string;
  examCenter: string;
  options: Institution[];
  aadharDocument: string;
  birthCertificate: string;
}

const sampleData: ApplicationDetails = {
  name: "John Doe",
  dob: new Date("1990-01-01"),
  imageURL: "https://example.com/applicant-image.jpg",
  fathersName: "James Doe",
  guardiansName: "Jane Doe",
  aadharNumber: "1234 5678 9012",
  state: "Sample State",
  district: "Sample District",
  village: "Sample Village",
  postOffice: "Sample Post Office",
  policeStation: "Sample Police Station",
  pinCode: "123456",
  whatsapp: "+91 98765 43210",
  alternativeNumber: "+91 98765 43211",
  email: "john.doe@example.com",
  examCenter: "Sample Exam Center",
  options: [{ name: "Institution 1" }, { name: "Institution 2" }],
  aadharDocument: "https://example.com/aadhar-document.jpg",
  birthCertificate: "https://example.com/birth-certificate.jpg"
};

export default function PreviewApplicationDetails() {
  const [applicationDetails] = useState<ApplicationDetails>(sampleData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = () => {

  };

  const handleEdit = () => {

  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-primary text-center bg-clip-text"
      >
        Application Details
      </motion.h1>
      
      <div className="bg-gradient-to-br from-background to-secondary overflow-hidden">
        <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center">
            <User className="mr-2" /> Applicant Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <ScrollArea className="h-[70vh] px-4"> */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
                 <div className="flex flex-col items-center space-y-4">
                    <Dialog>
                      <DialogTrigger>
                        <img 
                          src={applicationDetails.imageURL} 
                          alt="Applicant" 
                          className="w-32 h-32 rounded-full object-cover border-4 border-primary cursor-pointer transition-transform hover:scale-105"
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <img
                          src={applicationDetails.imageURL} 
                          alt="Applicant" 
                          className="w-full h-auto object-contain"
                        />
                      </DialogContent>
                    </Dialog>
                    <h2 className="text-2xl font-semibold text-primary">{applicationDetails.name}</h2>
                  </div>
                  
                  <Separator /> 

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
               

                  <DetailItem icon={<Calendar />} label="Date of Birth" value={applicationDetails.dob.toLocaleDateString()} />
                  <DetailItem icon={<Users />} label="Father's Name" value={applicationDetails.fathersName} />
                  <DetailItem icon={<Users />} label="Guardian's Name" value={applicationDetails.guardiansName} />
                  <DetailItem icon={<CreditCard />} label="Aadhar Number" value={applicationDetails.aadharNumber} />
                  <DetailItem icon={<Building />} label="Exam Center" value={applicationDetails.examCenter} />
                </div>
                

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary flex items-center"><MapPin className="mr-2" /> Address Details</h3>
                  <DetailItem icon={<MapPin />} label="State" value={applicationDetails.state} />
                  <DetailItem icon={<MapPin />} label="District" value={applicationDetails.district} />
                  <DetailItem icon={<MapPin />} label="Village" value={applicationDetails.village} />
                  <DetailItem icon={<MapPin />} label="Post Office" value={applicationDetails.postOffice} />
                  <DetailItem icon={<MapPin />} label="Police Station" value={applicationDetails.policeStation} />
                  <DetailItem icon={<MapPin />} label="Pin Code" value={applicationDetails.pinCode} />
                </div>
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary flex items-center"><Phone className="mr-2" /> Contact Information</h3>
                  <DetailItem icon={<Phone />} label="WhatsApp" value={applicationDetails.whatsapp} />
                  <DetailItem icon={<Phone />} label="Alternative Number" value={applicationDetails.alternativeNumber} />
                  <DetailItem icon={<Mail />} label="Email" value={applicationDetails.email} />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary flex items-center"><Building className="mr-2" /> Institution Options</h3>
                  {applicationDetails.options.map((option, index) => (
                    <DetailItem key={index} icon={<Building />} label={`Option ${index + 1}`} value={option.name} />
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              <h3 className="text-xl font-semibold text-primary flex items-center"><FileText className="mr-2" /> Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentImage label="Aadhar Document" src={applicationDetails.aadharDocument} />
                <DocumentImage label="Birth Certificate" src={applicationDetails.birthCertificate} />
              </div>
            </motion.div>
          {/* </ScrollArea> */}
        </CardContent>
      </div>

      <div className="flex justify-between">
        <Button 
          onClick={handleEdit}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300 text-lg px-8 py-4"
        >
          <Edit className="mr-2" /> Edit Application
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 text-lg px-8 py-4"
        >
          <Send className="mr-2" /> Submit Application
        </Button>
      </div>

    </div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-2 bg-background/40 backdrop-blur-sm p-2 rounded-lg shadow-sm">
      {icon}
      <span className="font-semibold text-primary">{label}:</span>
      <span className="text-secondary-foreground">{value}</span>
    </div>
  )
}

function DocumentImage({ label, src }: { label: string, src: string }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-primary">{label}</h4>
      <Dialog>
        <DialogTrigger>
          <img 
            src={src}
            alt={label}
            className="w-full h-40 object-cover rounded-lg border border-primary cursor-pointer transition-transform hover:scale-105" 
          />
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <img
            src={src} 
            alt={label} 
            className="w-full h-auto object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}