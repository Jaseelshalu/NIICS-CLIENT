'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Search, SortAsc, SortDesc, Filter, CheckCircle, XCircle, LayoutDashboard, ClipboardCheck, PenTool, LayoutDashboardIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import TableFilterSort from '@/components/ui/TableFilterSort'

type Applicant = {
  _id: string
  rollNumber: string
  name: string
  verified: boolean
  paid: boolean
}

type SortConfig = {
  key: keyof Applicant
  direction: 'asc' | 'desc'
}

const initialApplicants: Applicant[] = [
  { _id: '1', rollNumber: 'APP001', name: 'John Doe', verified: false, paid: false },
  { _id: '2', rollNumber: 'APP002', name: 'Jane Smith', verified: false, paid: false },
  { _id: '3', rollNumber: 'APP003', name: 'Alice Johnson', verified: false, paid: false },
]

export default function ApplicantVerificationPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'rollNumber', direction: 'asc' })
  const [filters, setFilters] = useState<Partial<Record<keyof Applicant, string>>>({})
  const [confirmAction, setConfirmAction] = useState<{ id: string, type: 'verify' | 'pay' } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const navigate = useNavigate()

  const handleActionClick = (id: string, type: 'verify' | 'pay') => {
    setConfirmAction({ id, type })
    setIsDialogOpen(true)
  }

  const confirmActionHandler = () => {
    if (confirmAction) {
      setApplicants(applicants.map(app =>
        app._id === confirmAction.id
          ? { ...app, [confirmAction.type === 'verify' ? 'verified' : 'paid']: !app[confirmAction.type === 'verify' ? 'verified' : 'paid'] }
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

  const handleSort = (key: keyof Applicant, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleFilter = (key: keyof Applicant, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
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
    <div className="container mx-auto p-4 space-y-8">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Applicants Verification</h1>
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
        </div>
      </div>

      {/* lg view of buttons */}
      <div className="hidden lg:flex justify-center space-x-4">
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
          onClick={() => navigate('/exam-center/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
          <ClipboardCheck className="mr-2 h-4 w-4" /> Verification
        </Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300"
          onClick={() => navigate('/exam-center/marks-entry')}>
          <PenTool className="mr-2 h-4 w-4" /> Mark Entry
        </Button>
      </div>

      {/* sm view of buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden">
        <div className="flex justify-around items-center h-16">
          <div className="flex flex-col items-center px-4 py-2" onClick={() => navigate('/exam-center/dashboard')}>
            <>
              <LayoutDashboardIcon className="h-4 w-4" />
              <span className="text-xs mt-1">Dashboard</span>
            </>
          </div>
          <div className="flex flex-col items-center px-4 py-2">
            <ClipboardCheck className="h-4 w-4" />
            <span className="text-xs mt-1">Verification</span>
          </div>
          <div className="flex flex-col items-center px-4 py-2" onClick={() => navigate('/exam-center/marks-entry')}>
            <PenTool className="h-4 w-4" />
            <span className="text-xs mt-1">Mark Entry</span>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-background to-secondary overflow-hidden">
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {['rollNumber', 'name'].map((key) => (
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
                  {['verified', 'paid'].map((key) => (
                    <TableHead key={key}>
                      <div className="flex items-center justify-between">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        <TableFilterSort
                          filters={filters}
                          handleFilter={handleFilter}
                          sortConfig={sortConfig}
                          handleSort={handleSort}
                          haveFilter={false}
                          keyLabel={key as keyof Applicant}
                        />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {applicants.length > 0 &&
                    filteredAndSortedApplicants.length !== 0 &&
                    filteredAndSortedApplicants.map((app, index) => (
                      <motion.tr
                        key={app?._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-primary/5 transition-colors duration-300"
                        layout
                      >
                        <TableCell className="font-medium">{app.rollNumber}</TableCell>
                        <TableCell>{app.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleActionClick(app._id, 'verify')}
                              className={`transition-colors duration-300 ${app.verified
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                                }`}
                            >
                              {app.verified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                            <motion.span
                              key={`verified-${app._id}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {app.verified ? 'Verified' : 'Not Verified'}
                            </motion.span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleActionClick(app._id, 'pay')}
                              className={`transition-colors duration-300 ${app.paid
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                                }`}
                            >
                              {app.paid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                            <motion.span
                              key={`paid-${app._id}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {app.paid ? 'Paid' : 'Not Paid'}
                            </motion.span>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  {applicants.length > 0 &&
                    filteredAndSortedApplicants.length === 0 && (
                      <motion.tr
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-primary/5 transition-colors duration-300"
                      >
                        <TableCell colSpan={9} className="text-center py-4">
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
            Are you sure you want to {confirmAction?.type === 'verify' ? 'change the verification status' : 'change the payment status'} for this application?
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