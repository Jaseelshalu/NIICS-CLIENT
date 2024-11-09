'use client'

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Edit, Trash2, Eye, Filter, SortAsc, SortDesc, CheckCircle, XCircle, CircleX, FilterX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import TableFilterSort from "@/components/ui/TableFilterSort"

interface Institution {
  name: string;
}

interface ExamCenter {
  name: string;
}

interface Applicant {
  id: string;
  name: string;
  applicationNumber: string;
  imageURL: string;
  dob: Date;
  fathersName: string;
  guardiansName: string;
  aadharNumber: string;
  state: string;
  district: string;
  village: string;
  postOffice: string;
  policeStation: string;
  pinCode: string;
  whatsapp: string;
  alternativeNumber: string;
  email: string;
  examCenter: ExamCenter;
  options: Institution[];
  aadharDocument: string;
  birthCertificate: string;
  accepted: boolean;
}

const sampleApplicants: Applicant[] = [
  {
    id: "1",
    name: "John Doe",
    applicationNumber: "APP001",
    imageURL: "https://example.com/john-doe.jpg",
    dob: new Date("1990-01-01"),
    fathersName: "James Doe",
    guardiansName: "Jane Doe",
    aadharNumber: "1234 5678 9012",
    state: "Sample State",
    district: "Sample District",
    village: "Sample Village",
    postOffice: "Sample Post Office",
    policeStation: "Sample Police Station",
    pinCode: "123456",
    whatsapp: "+91 98765 43210",
    alternativeNumber: "+91 98765 43211",
    email: "john.doe@example.com",
    examCenter: {name:"Sample Exam Center"},
    options: [{ name: "Institution 1" }, { name: "Institution 2" }],
    aadharDocument: "https://example.com/john-doe-aadhar.jpg",
    birthCertificate: "https://example.com/john-doe-birth.jpg",
    accepted: true
  },
  {
    id: "2",
    name: "Jane Doe",
    applicationNumber: "APP002",
    imageURL: "https://example.com/jane-doe.jpg",
    dob: new Date("1995-01-01"),
    fathersName: "James Doe",
    guardiansName: "John Doe",
    aadharNumber: "1234 5678 9013",
    state: "Sample State",
    district: "Sample District",
    village: "Sample Village",
    postOffice: "Sample Post Office",
    policeStation: "Sample Police Station",
    pinCode: "123456",
    whatsapp: "+91 98765 43212",
    alternativeNumber: "+91 98765 43213",
    email: "sampel@email.com",
    examCenter: {name:"Sample Exam Center 2"},
    options: [{ name: "Institution 1" }, { name: "Institution 2" }],
    aadharDocument: "https://example.com/jane-doe-aadhar.jpg",
    birthCertificate: "https://example.com/jane-doe-birth.jpg",
    accepted: false
  }
  // Add more sample applicants here
];

type SortConfig = {
  key: keyof Applicant;
  direction: 'asc' | 'desc';
}

export default function ApplicantApprovalPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(sampleApplicants);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState<Partial<Record<keyof Applicant, string>>>({});
  const [confirmAction, setConfirmAction] = useState<{ id: string, type: 'approve' } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()


  const handleActionClick = (id: string, type: 'approve') => {
    setConfirmAction({ id, type })
    setIsDialogOpen(true)
  }

  const confirmActionHandler = () => {
    if (confirmAction) {
      setApplicants(applicants.map(app =>
        app.id === confirmAction.id
          ? { ...app, accepted: !app.accepted }
          : app
      ))
      setConfirmAction(null)
    }
    setIsDialogOpen(false)
  }

  const cancelActionHandler = () => {
    setConfirmAction(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit applicant with id:", id);
  };

  const handleDelete = (id: string) => {
    setApplicants(applicants.filter(app => app.id !== id));
  };

  const handleViewMore = (id: string) => {
    // Implement view more functionality
    navigate('/')
  };

  const handleSort = (key: keyof Applicant, direction: "asc" | "desc") => {
    setSortConfig({
      key,
      direction
    });
  };

  const handleFilter = (key: keyof Applicant, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const useFilteredAndSorted = <Type,>(
    items: Type[],
    filters: Partial<Record<keyof Type, string>>,
    searchTerm: string,
    sortConfig: { key: keyof Type; direction: 'asc' | 'desc' }
  ): Type[] => useMemo(() => {
    return items
      .filter((item: Type) =>
        Object.entries(filters).every(([key, value]) =>
          item[key as keyof Type]?.toString().toLowerCase().includes((value as any).toLowerCase())
        ) &&
        Object.values(item as Record<string, unknown>).some(val =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a: Type, b: Type) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [items, filters, searchTerm, sortConfig]);

  const filteredAndSortedApplicants = useFilteredAndSorted<Applicant>(
    applicants,
    filters,
    searchTerm,
    sortConfig
  );




  return (
    <div className="container mx-auto p-4 space-y-8 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Applicant Management</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search Applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60"
              size={18}
            />
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 w-full sm:w-auto"
            onClick={() => {
              () => navigate('/apply/personal-details')
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Create New
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-background to-secondary">
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {['name', 'applicationNumber', 'dob', 'email', 'examCenter'].map((key) => (
                    <TableHead key={key}>
                      <div className="flex items-center justify-between">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        <TableFilterSort
                          filters={filters}
                          handleFilter={handleFilter}
                          sortConfig={sortConfig}
                          handleSort={handleSort}
                          keyLabel={key as keyof Applicant}
                        />
                      </div>
                    </TableHead>
                  ))}
                  <TableHead>Photo</TableHead>
                  <TableHead>Documents</TableHead>
                  {/* <TableHead>Approved</TableHead> */}
                  <TableHead key={'accepted'}>
                      <div className="flex items-center justify-between">
                        Approved
                        <TableFilterSort
                          filters={filters}
                          handleFilter={handleFilter}
                          sortConfig={sortConfig}
                          handleSort={handleSort}
                          haveFilter={false}
                          keyLabel={'accepted' as keyof Applicant}
                        />
                      </div>
                    </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredAndSortedApplicants.length !== 0 &&
                    filteredAndSortedApplicants.map((data, index) => (
                      <motion.tr
                        key={data.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-primary/5 transition-colors duration-300"
                        layout
                      >
                        <TableCell className="font-medium">{data.name}</TableCell>
                        <TableCell>{data.applicationNumber}</TableCell>
                        <TableCell>{data.dob.toLocaleDateString()}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.examCenter.name}</TableCell>
                        <TableCell>
                          <img src={data.imageURL} alt={data.name} className="w-10 h-10 rounded-full object-cover" />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Aadhar</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Aadhar Document</DialogTitle>
                                </DialogHeader>
                                <img src={data.aadharDocument} alt="Aadhar Document" className="w-full h-auto" />
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Birth</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Birth Certificate</DialogTitle>
                                </DialogHeader>
                                <img src={data.birthCertificate} alt="Birth Certificate" className="w-full h-auto" />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleActionClick(data.id, 'approve')}
                              className={`transition-colors duration-300 ${data.accepted
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                                }`}
                            >
                              {data.accepted ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                            <motion.span
                              key={`approved-${data.id}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {data.accepted ? 'Approved' : 'Not Approved'}
                            </motion.span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewMore(data.id)}
                              className="hover:bg-primary/10 transition-colors duration-300"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}

                  {filteredAndSortedApplicants.length === 0 && (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell colSpan={9 } className="text-center py-4">
                        <span className="text-sm text-primary">
                          Clear the filters to see applicants
                        </span>
                      </TableCell>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to {confirmAction?.type === 'approve' ? 'change the verification status' : 'change the payment status'} for this application?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={cancelActionHandler}>Cancel</Button>
            <Button onClick={confirmActionHandler}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}