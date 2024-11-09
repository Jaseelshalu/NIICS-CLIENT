'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import useApplicantStore from '@/store/applicantStore'
import useExamCenterStore from '@/store/examCenterStore'
import { ExamCenter as ExamCenterType } from '@/types/types'
import useInstitutionStore from '@/store/institutionStore'

export default function ExamCenter() {
  const { editingApplicant, setEditingApplicant } = useApplicantStore()
  const { examCenters , setExamCenters ,getExamCenters} = useExamCenterStore();
  const { institutions , getInstitutions } = useInstitutionStore()

  useEffect(()=>{
    getExamCenters()
    getInstitutions()
  },[])

  const [fileErrors, setFileErrors] = useState({
    aadharDocument: '',
    birthCertificate: ''
  })
  const navigate = useNavigate()

  // Set the selected exam center
  const handleChange = (value: string) => {
    setEditingApplicant({ ...editingApplicant, examCenter: value } as any)
  }

  // Add an institution to the options if not already included
  const handleInstitutionChange = (value: string) => {
    const updatedInstitutions = editingApplicant?.options ? [...editingApplicant?.options] : []
    if (!updatedInstitutions.includes(value as any)) {
      updatedInstitutions.push(value as any)
      setEditingApplicant({ ...editingApplicant, options: updatedInstitutions }as any)
    }
  }

  // Remove an institution from the options
  const removeInstitution = (institution: string) => {
    if (editingApplicant?.options) {
      const updatedInstitutions = editingApplicant?.options.filter(i => i !== (institution as any))
      setEditingApplicant({ ...editingApplicant, options: updatedInstitutions })
    }
  }

  // Move an institution up or down in the order
  const moveInstitution = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (editingApplicant?.options && newIndex >= 0 && newIndex < editingApplicant?.options.length) {
      const updatedInstitutions = [...editingApplicant?.options]
      const [movedInstitution] = updatedInstitutions.splice(index, 1)
      updatedInstitutions.splice(newIndex, 0, movedInstitution)
      setEditingApplicant({ ...editingApplicant, options: updatedInstitutions })
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/edit-application/upload-documents')
  }

  // Check if form is valid before submitting
  const isFormValid = () => {
    return !!editingApplicant?.examCenter && editingApplicant?.options?.length > 0
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Exam Centers</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="examCenter">Exam Center</Label>
              <Select defaultValue={editingApplicant?.examCenter as any} onValueChange={handleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Exam Center" />
                </SelectTrigger>
                <SelectContent>
                  {
                    examCenters?.map((examCenter:ExamCenterType)=>
                      <SelectItem value={examCenter?._id}> <span className='font-semibold'>{examCenter?.code}</span> {examCenter.name}</SelectItem>
                    )
                  }
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
                  {institutions?.map((institution) => (
                    <SelectItem key={institution._id} value={institution._id}> <span className='font-semibold'>{institution?.code}</span> {institution.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 space-y-2">
                {editingApplicant?.options?.map((institution : any, index) => (
                  <div key={institution} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <Badge variant="secondary" className="mr-2">{index + 1}</Badge>
                    <span className="flex-grow">
                      <span className="font-semibold">{
                        institutions.find((i : any) => i._id === institution)?.code
                        } </span>
                      {institutions.find((i : any) => i._id === institution)?.name
                      }</span>
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
                        disabled={index === editingApplicant?.options.length - 1}
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
              <Button type="button" onClick={() => navigate('/edi/contact-details')}>Previous</Button>
              <Button type="submit" disabled={!isFormValid()}>Next</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
