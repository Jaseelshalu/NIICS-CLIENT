'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { SuccessMessage } from './ApplicationSuccess'

const admissionInstitutions = [
  "Institution A",
  "Institution B",
  "Institution C",
  "Institution D",
  "Institution E",
]

export function ExamCenter() {
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
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const navigate = useNavigate()

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
    console.log('Form submitted:', formData);
    
    navigate('/apply/upload-documents')
  }

  const isFormValid = () => {
    return formData.examCenter &&
      formData.admissionInstitutions.length > 0
  }

  return (
    <>
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Admission Application</h1>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Exam Centers</CardTitle>
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
              <div className="flex justify-between">

                <Button type="submit" disabled={!isFormValid()}>Next</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}