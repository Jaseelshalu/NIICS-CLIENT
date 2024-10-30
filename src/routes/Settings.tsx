'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from '@/components/Sidebar'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    academicYear: '2023-2024',
    admissionStartsAt: '2023-06-01T09:00',
    admissionEndsAt: '2023-07-31T18:00',
    resultsPublishingAt: '2023-08-15T12:00',
    resultsEndingAt: '2023-08-31T23:59',
    applicantDOBStarting: '2000-01-01',
    applicantDOBEnding: '2005-12-31',
    admissionMax: '1000',
    admissionMin: '500',
  })

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Submitting settings:', settings)
    // toast({
    //   title: "Settings updated",
    //   description: "Your changes have been saved successfully.",
    // })
  }

  return (
    <div className="">
      {/* <Sidebar/> */}
      <div className="bg-gradient-to-br from-background to-secondary">
        <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary">Admin Settings</CardTitle>
          <CardDescription>Manage admission and academic settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="academicYear" className="text-lg font-semibold">Academic Year</Label>
              <Input
                id="academicYear"
                name="academicYear"
                value={settings.academicYear}
                onChange={handleSettingsChange}
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Admission Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admissionStartsAt">Starts At</Label>
                  <Input
                    id="admissionStartsAt"
                    name="admissionStartsAt"
                    type="datetime-local"
                    value={settings.admissionStartsAt}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admissionEndsAt">Ends At</Label>
                  <Input
                    id="admissionEndsAt"
                    name="admissionEndsAt"
                    type="datetime-local"
                    value={settings.admissionEndsAt}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Results Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resultsPublishingAt">Publishing At</Label>
                  <Input
                    id="resultsPublishingAt"
                    name="resultsPublishingAt"
                    type="datetime-local"
                    value={settings.resultsPublishingAt}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resultsEndingAt">Ending At</Label>
                  <Input
                    id="resultsEndingAt"
                    name="resultsEndingAt"
                    type="datetime-local"
                    value={settings.resultsEndingAt}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Applicant Date of Birth Range</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applicantDOBStarting">Starting</Label>
                  <Input
                    id="applicantDOBStarting"
                    name="applicantDOBStarting"
                    type="date"
                    value={settings.applicantDOBStarting}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicantDOBEnding">Ending</Label>
                  <Input
                    id="applicantDOBEnding"
                    name="applicantDOBEnding"
                    type="date"
                    value={settings.applicantDOBEnding}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Admission Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admissionMin">Minimum</Label>
                  <Input
                    id="admissionMin"
                    name="admissionMin"
                    type="number"
                    value={settings.admissionMin}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admissionMax">Maximum</Label>
                  <Input
                    id="admissionMax"
                    name="admissionMax"
                    type="number"
                    value={settings.admissionMax}
                    onChange={handleSettingsChange}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">Save Changes</Button>
          </form>
        </CardContent>
      </div>
      {/* <Toaster /> */}
    </div>
  )
}