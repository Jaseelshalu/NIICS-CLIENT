'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { User, Calendar, Image, Users, CreditCard, MapPin, Phone, Mail, Building, FileText, Send, Edit } from "lucide-react"
import useApplicantStore from '@/store/applicantStore';
import { useNavigate } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { Applicant } from '@/types/types';

interface Institution {
  name: string;
}


export default function ViewDetailedApplicant() {
  const { applicant , initialApplicantLoad } = useApplicantStore();

  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Application Details";
    const applicant = JSON.parse(localStorage.getItem("applicant") as string);
    if (applicant) {
      initialApplicantLoad(applicant as Applicant);
    } else {
      navigate("/check-status");
    }
  }, []);


  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-background">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Application Details
      </h1>
      {/* back button */}
        <div className="flex justify-center mt-6 mb-4">
            <Button variant="default" onClick={() => navigate('/my-profile')}>
            <Send className="mr-2 h-4 w-4" /> Go Back
            </Button>
        </div>
        
      <Separator className='mb-4'/>

      <div className="flex flex-col items-center mb-6">
        <img src={applicant?.imageURL} alt="Applicant" className="w-32 h-32 rounded-full object-cover mb-4" />
        <h2 className="text-xl font-semibold">{applicant?.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DetailItem icon={<Calendar />} label="Date of Birth" value={applicant?.dob as any} />
          <DetailItem icon={<Users />} label="Father's Name" value={applicant?.fathersName as string} />
          <DetailItem icon={<Users />} label="Guardian's Name" value={applicant?.guardiansName as string} />
          <DetailItem icon={<CreditCard />} label="Aadhar Number" value={applicant?.aadharNumber as string} />
          <DetailItem icon={<MapPin />} label="State" value={applicant?.state as string} />
          <DetailItem icon={<MapPin />} label="District" value={applicant?.district as string} />
          <DetailItem icon={<MapPin />} label="Village" value={applicant?.village as string} />
          <DetailItem icon={<MapPin />} label="Post Office" value={applicant?.postOffice as string} />
        </div>
        <div className="space-y-4">
          <DetailItem icon={<MapPin />} label="Police Station" value={applicant?.policeStation as string} />
          <DetailItem icon={<MapPin />} label="Pin Code" value={applicant?.pinCode as string} />
          <DetailItem icon={<Phone />} label="WhatsApp" value={applicant?.whatsapp as string} />
          <DetailItem icon={<Phone />} label="Alternative Number" value={applicant?.alternativeNumber as string} />
          <DetailItem icon={<Mail />} label="Email" value={applicant?.email as string} />
          <DetailItem icon={<Building />} label="Exam Center" value={applicant?.examCenter.name as any} />
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center"><Building className="mr-2" /> Institution Options</h3>
            {/* view table mode institution option details with SI no , code , name border needed*/}
            <table className="table-auto w-full">
              <thead className='border'>
                <tr className='border'>
                  <th className='border px-1'>SI No</th>
                  <th className='border px-1'>Code</th>
                  <th className='border px-1'>Name</th>
                </tr>
              </thead>
              <tbody>
                {applicant?.options.map((option, index) => (
                  <tr key={index}>
                    <td className='border px-1'>{index+1}</td>
                    <td className='border px-1'>{option.code}</td>
                    <td className='border px-1'>{option.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
      <Separator className='mb-4'/>
        <h3 className="font-semibold flex items-center text-center"><FileText className="mr-2" /> Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Aadhar Document:</p>
            <img src={applicant?.aadharDocument} alt="Aadhar Document" className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div>
            <p className="mb-2">Birth Certificate:</p>
            <img src={applicant?.birthCertificate} alt="Birth Certificate" className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
      </div>
      <Separator className='mb-4'/>
      <div className="flex justify-center mt-6">
        {
            !applicant?.accepted && (
                <Button onClick={
                  () => {
                    navigate('/edit-application/personal-details')
                  }
                }  variant="default">
                <Edit className="mr-2 h-4 w-4" /> Edit Application
                </Button>
            )
        }
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