'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SuccessMessage } from './ApplicationSuccess'



export function UploadDocuments() {
  const [formData, setFormData] = useState({
    aadharDocument: '',
    birthCertificate: ''
  })
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
          setFormData(prev => ({ ...prev, [fieldName]: e.target!.result as string }))
          setFileErrors(prev => ({ ...prev, [fieldName]: '' }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/apply/preview')
    // onNext({ examCenter: formData })
  }

  const isFormValid = () => {
    return formData.aadharDocument &&
      formData.birthCertificate
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
                  required
                />
                {fileErrors.aadharDocument && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fileErrors.aadharDocument}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">Upload a JPG or JPEG image, max 1MB</p>
                {formData.aadharDocument && (
                  <div className="mt-2">
                    <img src={formData.aadharDocument} alt="Aadhar Document" className="max-w-[100px] h-auto" />
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
                  required
                />
                {fileErrors.birthCertificate && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fileErrors.birthCertificate}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">Upload a JPG or JPEG image, max 1MB</p>
                {formData.birthCertificate && (
                  <div className="mt-2">
                    <img src={formData.birthCertificate} alt="Birth Certificate" className="max-w-[100px] h-auto" />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
              <Button type="button" onClick={()=>{navigate('/apply/exam-center')}}>Previous</Button>
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