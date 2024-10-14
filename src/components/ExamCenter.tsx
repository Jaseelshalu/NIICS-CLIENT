'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const admissionInstitutions = [
  "Institution A",
  "Institution B",
  "Institution C",
  "Institution D",
  "Institution E",
]

export function ExamCenter({ onNext, onDoLater }: { onNext: (data: any) => void, onDoLater: () => void }) {
  const [formData, setFormData] = useState({
    examCenter: '',
    admissionInstitutions: [] as string[],
    aadharDocument: '',
    birthCertificate: ''
  })
  const [fileErrors, setFileErrors] = useState({
    aadharDocument: '',
    birthCertificate: ''
  })

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInstitutionChange = (value: string) => {
    setFormData(prev => {
      const updatedInstitutions = [...prev.admissionInstitutions]
      if (!updatedInstitutions.includes(value)) {
        updatedInstitutions.push(value)
      }
      return { ...prev, admissionInstitutions: updatedInstitutions }
    })
  }

  const removeInstitution = (institution: string) => {
    setFormData(prev => ({
      ...prev,
      admissionInstitutions: prev.admissionInstitutions.filter(i => i !== institution)
    }))
  }

  const moveInstitution = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < formData.admissionInstitutions.length) {
      const updatedInstitutions = [...formData.admissionInstitutions]
      const temp = updatedInstitutions[index]
      updatedInstitutions[index] = updatedInstitutions[newIndex]
      updatedInstitutions[newIndex] = temp
      setFormData(prev => ({ ...prev, admissionInstitutions: updatedInstitutions }))
    }
  }

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
    onNext({ examCenter: formData })
  }

  const isFormValid = () => {
    return formData.examCenter && 
           formData.admissionInstitutions.length > 0 && 
           formData.aadharDocument && 
           formData.birthCertificate
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exam Center and Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="examCenter">Exam Center</Label>
            <Select onValueChange={(value) => handleChange('examCenter', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Exam Center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center1">Exam Center 1</SelectItem>
                <SelectItem value="center2">Exam Center 2</SelectItem>
                <SelectItem value="center3">Exam Center 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="admissionInstitution">Admission Institutions (in order of preference)</Label>
            <Select onValueChange={handleInstitutionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Admission Institution" />
              </SelectTrigger>
              <SelectContent>
                {admissionInstitutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>{institution}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 space-y-2">
              {formData.admissionInstitutions.map((institution, index) => (
                <div key={institution} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <Badge variant="secondary" className="mr-2">{index + 1}</Badge>
                  <span className="flex-grow">{institution}</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => moveInstitution(index, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => moveInstitution(index, 'down')}
                      disabled={index === formData.admissionInstitutions.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeInstitution(institution)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <Button type="button" variant="outline" onClick={onDoLater}>Do Later</Button>
            <Button type="submit" disabled={!isFormValid()}>Submit Application</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}