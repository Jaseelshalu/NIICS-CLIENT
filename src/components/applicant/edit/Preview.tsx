'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { User, Calendar, Image, Users, CreditCard, MapPin, Phone, Mail, Building, FileText, Send, Edit } from "lucide-react"
import useApplicantStore from '@/store/applicantStore';
import { useNavigate } from 'react-router-dom';
import { Separator } from '../../ui/separator';
import { Applicant } from '@/types/types';

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
  imageURL: "https://example.com/editingApplicant-image.jpg",
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

export default function EditPreview() {
  const [details, setDetails] = useState<ApplicationDetails>(sampleData);
  const {
    editingApplicant,
    setEditingApplicant,
    updateApplicant
  } = useApplicantStore()

  const navigate = useNavigate()

  const handleClickSubmit = async () => {
    // setEditingApplicant(details)
    // navigate('/apply/upload-documents')
    const edited = await updateApplicant(editingApplicant as Applicant);
      console.log(edited);
      
      if (edited) {
        navigate('/edit-application/success-message')
      }else{
        navigate('/edit-application/error-message')
      }

  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-background">
      <Separator className='mb-4'/>

      <h1 className="text-2xl font-semibold text-center mb-6">Full Application Preview</h1>
      <div className="flex flex-col items-center mb-6">
        <img src={editingApplicant?.imageURL} alt="Applicant" className="w-32 h-32 rounded-full object-cover mb-4" />
        <h2 className="text-xl font-semibold">{editingApplicant?.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DetailItem icon={<Calendar />} label="Date of Birth" value={editingApplicant?.dob?.toString().slice(0,10) as any} />
          <DetailItem icon={<Users />} label="Father's Name" value={editingApplicant?.fathersName as string} />
          <DetailItem icon={<Users />} label="Guardian's Name" value={editingApplicant?.guardiansName as string} />
          <DetailItem icon={<CreditCard />} label="Aadhar Number" value={editingApplicant?.aadharNumber as string} />
          <DetailItem icon={<MapPin />} label="State" value={editingApplicant?.state as string} />
          <DetailItem icon={<MapPin />} label="District" value={editingApplicant?.district as string} />
          <DetailItem icon={<MapPin />} label="Village" value={editingApplicant?.village as string} />
          <DetailItem icon={<MapPin />} label="Post Office" value={editingApplicant?.postOffice as string} />
        </div>
        <div className="space-y-4">
          <DetailItem icon={<MapPin />} label="Police Station" value={editingApplicant?.policeStation as string} />
          <DetailItem icon={<MapPin />} label="Pin Code" value={editingApplicant?.pinCode as string} />
          <DetailItem icon={<Phone />} label="WhatsApp" value={editingApplicant?.whatsapp as string} />
          <DetailItem icon={<Phone />} label="Alternative Number" value={editingApplicant?.alternativeNumber as string} />
          <DetailItem icon={<Mail />} label="Email" value={editingApplicant?.email as string} />
          <DetailItem icon={<Building />} label="Exam Center" value={editingApplicant?.examCenter as any} />
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center"><Building className="mr-2" /> Institution Options</h3>
            {editingApplicant?.options.map((option, index) => (
              <div key={index} className="ml-6">{option.name}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
      <Separator className='mb-4'/>
        <h3 className="font-semibold flex items-center text-center"><FileText className="mr-2" /> Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Aadhar Document:</p>
            <img src={editingApplicant?.aadharDocument} alt="Aadhar Document" className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div>
            <p className="mb-2">Birth Certificate:</p>
            <img src={editingApplicant?.birthCertificate} alt="Birth Certificate" className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
      </div>
      <Separator className='mb-4'/>
      <div className="flex justify-between mt-6">
        <Button onClick={
          () => {
            navigate('/edit-application/personal-details')
          }
        } variant="outline" className="flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Edit Again
        </Button>
        <Button onClick={handleClickSubmit} className="flex items-center">
          <Send className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </div>
    </div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  )
}