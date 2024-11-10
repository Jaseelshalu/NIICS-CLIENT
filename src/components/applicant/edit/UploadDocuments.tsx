'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SuccessMessage  from './ApplicationSuccess'
import useApplicantStore from "@/store/applicantStore"
import { Applicant } from "@/types/types"
import { uploadImageToCloudinary } from "@/lib/utils"



export default function UploadDocumentsEdit() {
  const [aadharDocument, setAadharDocument] = useState<File | null>(null);
  const [birthCertificate , setBirthCertificate] = useState<File | null>(null);
  const [showAadharUploadButton, setShowAadharUploadButton] = useState(false);
  const [showBirthCertificateUploadButton, setShowBirthCertificateUploadButton] = useState(false);
  const {editingApplicant , setEditingApplicant} = useApplicantStore()
  const [fileErrors, setFileErrors] = useState({
    aadharDocument: '',
    birthCertificate: ''
  })
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const navigate = useNavigate()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        setFileErrors(prev => ({ ...prev, [fieldName]: 'Please upload a JPG or JPEG image.' }))
        return
      }
      if (file.size > 1024 * 1024) {
        setFileErrors(prev => ({ ...prev, [fieldName]: 'File size should be less than 1MB.' }))
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          // seteditingApplicant?(prev => ({ ...prev, [fieldName]: e.target!.result as string }))
          // setEditingApplicant({ ...editingApplicant, [fieldName]: e.target!.result as string } as any)
          if(fieldName === 'aadharDocument') {
            setAadharDocument(file)
            setShowAadharUploadButton(true)
            setEditingApplicant({ ...editingApplicant, aadharDocument: "" as string } as Applicant)
          }
          if(fieldName === 'birthCertificate') {
            setBirthCertificate(file)
            setShowBirthCertificateUploadButton(true)
            setEditingApplicant({ ...editingApplicant, birthCertificate: "" as string } as Applicant)
          }
          setFileErrors(prev => ({ ...prev, [fieldName]: '' }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAadharUpload = async () => {
    if (aadharDocument) {
      setEditingApplicant({
        ...editingApplicant,
        aadharDocument: "uploading" as string,
      } as Applicant);
      try {
        const url = await uploadImageToCloudinary(aadharDocument);
        setEditingApplicant({ ...editingApplicant, aadharDocument: url } as Applicant);
      } catch (error) {
        console.error("Failed to upload image", error);
        setFileErrors(prev => ({ ...prev, aadharDocument: 'Failed to upload image' }))
        setEditingApplicant({
          ...editingApplicant,
          aadharDocument: "" as string,
        } as Applicant);
      }
      setShowAadharUploadButton(false)
    }
  };

  const handleBirthCertificateUpload = async () => {
    if (birthCertificate) {
      setEditingApplicant({
        ...editingApplicant,
        birthCertificate: "uploading" as string,
      } as Applicant);
      try {
        const url = await uploadImageToCloudinary(birthCertificate);
        setEditingApplicant({ ...editingApplicant, birthCertificate: url } as Applicant);
      } catch (error) {
        console.error("Failed to upload image", error);
        setFileErrors(prev => ({ ...prev, birthCertificate: 'Failed to upload image' }))
        setEditingApplicant({
          ...editingApplicant,
          birthCertificate: "" as string,
        } as Applicant);
        setShowBirthCertificateUploadButton(false)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/edit-application/preview')
    // onNext({ examCenter: editingApplicant? })
  }

  const isFormValid = () => {
    return editingApplicant?.aadharDocument && editingApplicant?.birthCertificate
  }

  return (
    <>
      {applicationSubmitted ? (<>
        <SuccessMessage />
      </>)
        :
        (<div className="container mx-auto p-4 max-w-2xl">

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                handleSubmit(e)
                setApplicationSubmitted(true)
              }} className="space-y-4">
             <div>
                <Label htmlFor="aadharDocument">Upload Aadhar Document</Label>
                <Input
                  id="aadharDocument"
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'aadharDocument')}
                  accept=".jpg,.jpeg"
                  
                />
                {fileErrors.aadharDocument && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fileErrors.aadharDocument}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">Upload a JPG or JPEG image, max 1MB</p>
                {(editingApplicant?.aadharDocument || aadharDocument) && (
                  <div className="mt-2 relative">
                    <img src={aadharDocument
                            ? URL.createObjectURL(aadharDocument)
                            : editingApplicant?.aadharDocument
                            ? editingApplicant.aadharDocument
                            : ""} alt="Aadhar Document" className="max-w-[100px] h-auto" />
                     <div className="absolute top-[40%] left-4 flex items-center justify-center">
                        <span className="text-white text-sm bg-black bg-opacity-50 rounded-lg p-1">
                          {!editingApplicant?.aadharDocument
                            ? "Not Uploaded"
                            : editingApplicant?.aadharDocument === "uploading"
                            ? "Uploading..."
                            : editingApplicant?.aadharDocument === ""
                            ? "Can't Upload"
                            : "Uploaded"}
                        </span>
                      </div>
                      {showAadharUploadButton &&
                    aadharDocument && (
                      <Button
                        type="button"
                        onClick={handleAadharUpload}
                        className="mt-2"
                        disabled={editingApplicant?.imageURL === "uploading"}
                      >
                        Upload Image
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="birthCertificate">Upload Birth Certificate</Label>
                <Input
                  id="birthCertificate"
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'birthCertificate')}
                  accept=".jpg,.jpeg"
                />
                {fileErrors.birthCertificate && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fileErrors.birthCertificate}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">Upload a JPG or JPEG image, max 1MB</p>
                {(editingApplicant?.birthCertificate || birthCertificate) && (
                  <div className="mt-2 relative mb-2">
                    <img src={
                      birthCertificate
                            ? URL.createObjectURL(birthCertificate)
                            : editingApplicant?.birthCertificate
                            ? editingApplicant.birthCertificate
                            : ""
                    } alt="Birth Certificate" className="max-w-[100px] h-auto" />
                     <div className="absolute top-[40%] left-4 flex items-center justify-center">
                        <span className="text-white text-sm bg-black bg-opacity-50 rounded-lg p-1">
                          {!editingApplicant?.birthCertificate
                            ? "Not Uploaded"
                            : editingApplicant?.birthCertificate === "uploading"
                            ? "Uploading..."
                            : editingApplicant?.birthCertificate === ""
                            ? "Can't Upload"
                            : "Uploaded"}
                        </span>
                      </div>
                      {showBirthCertificateUploadButton && (
                      <Button
                        type="button"
                        onClick={handleBirthCertificateUpload}
                        className="mt-2"
                        disabled={editingApplicant?.imageURL === "uploading"}
                      >
                        Upload Image
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
              <Button type="button" onClick={()=>{navigate('/edit-application/exam-center')}}>Previous</Button>
                {/* <Button type="submit" disabled={!isFormValid()}>Submit Application</Button> */}
                <Button type="submit" variant="outline" disabled={!isFormValid()}>Preview</Button>
              </div>
              </form>
            </CardContent>
          </Card>
        </div>)}
    </>
  )
}