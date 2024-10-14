import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle2, Circle, Edit, MoreHorizontal } from "lucide-react"

export default function CandidateProfile() {
  const candidate = {
    name: "John Doe",
    phone: "+91 9876543210",
    aadhar: "1234 5678 9012",
    dob: "1990-01-01",
    guardianName: "Jane Doe",
    guardianAadhar: "9876 5432 1098",
  }

  const timelineSteps = [
    { label: "Applied", completed: true },
    { label: "Accepted", completed: true },
    { label: "Hall Ticket Downloaded", completed: true },
    { label: "Payment", completed: true },
    { label: "Verification", completed: false },
    { label: "Result Published", completed: false },
    { label: "Admit Card Downloaded", completed: false },
  ]

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold">Candidate Profile</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 w-full sm:w-auto">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Candidate"
              width={200}
              height={200}
              className="rounded-lg object-cover w-full sm:w-[200px] h-[200px]"
            />
          </div>
          <div className="flex-grow space-y-2 text-sm sm:text-base">
            <p><strong className="font-medium">Name:</strong> {candidate.name}</p>
            <p><strong className="font-medium">Phone:</strong> {candidate.phone}</p>
            <p><strong className="font-medium">Aadhar Number:</strong> {candidate.aadhar}</p>
            <p><strong className="font-medium">Date of Birth:</strong> {candidate.dob}</p>
            <p><strong className="font-medium">Guardian Name:</strong> {candidate.guardianName}</p>
            <p><strong className="font-medium">Guardian Aadhar:</strong> {candidate.guardianAadhar}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Admission Timeline</h3>
        </CardHeader>
        <CardContent>
          <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6 py-2">
            {timelineSteps.map((step, index) => (
              <li key={index} className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                </span>
                <h3 className={`text-sm sm:text-base font-medium leading-tight ${step.completed ? 'text-green-500' : 'text-gray-500'}`}>
                  {step.label}
                </h3>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}