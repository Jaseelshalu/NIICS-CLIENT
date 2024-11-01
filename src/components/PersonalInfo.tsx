'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingAnimation } from '@/components/ApplicationLoading'
import { SuccessMessage } from '@/components/ApplicationSuccess'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

export function PersonalInfo() {

  // const navigate = useNavigate()
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        phone: '',
        aadhar: '',
        dob: '',
        guardianName: '',
        fatherName: '',
        email: ''
    })
    const [imageError, setImageError] = useState('')
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    //   const [formData, setFormData] = useState({
    //     personalInfo: {},
    //     contactDetails: {},
    //     examCenter: {}
    //   })

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
                setImageError('Please upload a JPG or JPEG image.')
                return
            }
            if (file.size > 1024 * 1024) {
                setImageError('Image size should be less than 1MB.')
                return
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target) {
                    setFormData(prev => ({ ...prev, image: e.target!.result as string }))
                    setImageError('')
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/apply/contact-details')
        
    }

    const isFormValid = () => {
        return formData.image && formData.name && formData.phone && formData.aadhar &&
            formData.dob && formData.guardianName && formData.fatherName
    }

    if (loading) {
        return <LoadingAnimation />
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="image">Candidate's Image</Label>
                            <div className="mt-2 flex items-center space-x-4">
                                <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                    {formData.image ? (
                                        <img src={formData.image} alt="Candidate" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                                            <span>No image</span>
                                        </div>
                                    )}
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept=".jpg,.jpeg"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Upload a JPG or JPEG image, max 1MB</p>
                                    {imageError && (
                                        <p className="text-sm text-red-500 mt-1 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {imageError}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="aadhar">Aadhar Number</Label>
                            <Input id="aadhar" name="aadhar" value={formData.aadhar} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="guardianName">Guardian Name</Label>
                            <Input id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="fatherName">Father Name</Label>
                            <Input id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email (Optional)</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <Button type="submit" disabled={!isFormValid()}>Next</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}