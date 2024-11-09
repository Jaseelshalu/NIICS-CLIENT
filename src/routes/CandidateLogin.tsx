'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import useApplicantStore from '@/store/applicantStore'
import { useNavigate } from 'react-router-dom'

export default function CandidateLogin() {
  const [identifier, setIdentifier] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const {authApplicant}= useApplicantStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const auth  =await authApplicant(identifier, new Date(dateOfBirth))
    if (auth) {
      navigate('/my-profile')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className='text-center'>
          <CardTitle >Candidate Login</CardTitle>
          <CardDescription>Enter your details to check your application status</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Phone Number or Reference Number</Label>
              <Input
                id="identifier"
                placeholder="Enter phone or reference number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
              {/* <Input
                id="dob"
                type="date"
                value={format(dateOfBirth!, 'yyyy-mm-dd')}
                onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                required
              /> */}
              <Input
                      id="admissionStartsAt"
                      name="admissionStartsAt"
                      type="date"
                      value={dateOfBirth as any}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="bg-background/50 backdrop-blur-sm"
                      required
                    />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}