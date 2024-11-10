'use client'

import SuccessMessage from '@/components/applicant/edit/ApplicationSuccess'
import { useEffect, useState } from 'react'
import { LoadingAnimation } from '../../../components/ApplicationLoading'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useApplicantStore from '@/store/applicantStore'
import ErrorMessage from '@/components/applicant/edit/ApplicationError'

export default function EditApplicant() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    personalInfo: {},
    contactDetails: {},
    examCenter: {}
  })

  const {setEditingApplicant} = useApplicantStore()
  const navigate = useNavigate()


  const handleNext = async (data: any) => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormData(prev => ({ ...prev, [Object.keys(data)[0]]: data[Object.keys(data)[0]] }))
    setLoading(false)
    setStep(prev => prev + 1)
  }

  useEffect(() => {
    // take the editingApplicant data from local storage and set it to the store
    const editingApplicant = JSON.parse(localStorage.getItem("applicant") as string);
    if (!editingApplicant) {
      // navigate to the check status page if there is no editingApplicant data
      navigate("/check-status");
    }
    // set the editingApplicant data to the store
    // make the editingApplicant.examCenter.name to editingApplicant.examCenter
    editingApplicant.examCenter = editingApplicant.examCenter._id
    // make the editingApplicant.options the array of institution model to array of institution._id
    editingApplicant.options = editingApplicant.options.map((option: any) =>
        option._id
        );
    setEditingApplicant(editingApplicant)
  }, [])

  const handleDoLater = () => {
    // Logic for saving progress and exiting
    console.log("Progress saved. You can continue later.")
  }

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="container mx-auto p-4">
      {/* <Navigate to="/apply/personal-details" /> */}
      <h1 className="text-2xl font-bold mb-4 text-center">Admission Application</h1>

      {/* {step === 1 && <PersonalInfo onNext={handleNext} />} */}
      {/* {step === 2 && <ContactDetails onNext={handleNext} onDoLater={handleDoLater} />} */}
      {/* {step === 3 && <ExamCenter onNext={handleNext} onDoLater={handleDoLater} />} */}
      {step > 4 && <SuccessMessage />}
      {/* <SuccessMessage /> */}
      {/* <ErrorMessage /> */}
      <Outlet />
    </div>
  )
}