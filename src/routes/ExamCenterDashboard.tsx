'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Search, SortAsc, SortDesc, Filter, CheckCircle, XCircle, LayoutDashboard, ClipboardCheck, PenTool } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Application = {
  id: string
  applicationNumber: string
  name: string
  verified: boolean
  paid: boolean
}

type SortConfig = {
  key: keyof Application
  direction: 'asc' | 'desc'
}

const initialApplications: Application[] = [
  { id: '1', applicationNumber: 'APP001', name: 'John Doe', verified: false, paid: false },
  { id: '2', applicationNumber: 'APP002', name: 'Jane Smith', verified: false, paid: false },
  { id: '3', applicationNumber: 'APP003', name: 'Alice Johnson', verified: false, paid: false },
]

export default function ApplicationVerificationPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'applicationNumber', direction: 'asc' })
  const [filters, setFilters] = useState<Partial<Record<keyof Application, string>>>({})
  const [confirmAction, setConfirmAction] = useState<{ id: string, type: 'verify' | 'pay' } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleActionClick = (id: string, type: 'verify' | 'pay') => {
    setConfirmAction({ id, type })
    setIsDialogOpen(true)
  }

  const confirmActionHandler = () => {
    if (confirmAction) {
      setApplications(applications.map(app => 
        app.id === confirmAction.id
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

  const handleSort = (key: keyof Application) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (key: keyof Application, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }))
  }

  const filteredAndSortedApplications = useMemo(() => {
    return applications
      .filter(app => 
        Object.entries(filters).every(([key, value]) => {
          if (key === 'verified' || key === 'paid') {
            return value === '' || app[key].toString() === value
          }
          return app[key as keyof Application].toString().toLowerCase().includes(value.toLowerCase())
        }) &&
        Object.values(app).some(val => 
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
  }, [applications, filters, searchTerm, sortConfig])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Application Verification</h1>
        <div className="relative w-64">
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" size={18} />
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300">
          <ClipboardCheck className="mr-2 h-4 w-4" /> Verification
        </Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300">
          <PenTool className="mr-2 h-4 w-4" /> Mark Entry
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-background to-secondary overflow-hidden">
        <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary">Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {['applicationNumber', 'name', 'verified', 'paid'].map((key) => (
                    <TableHead key={key}>
                      <div className="flex items-center justify-between">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2 hover:bg-primary/10 transition-colors duration-300">
                              <Filter className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-primary/20">
                            <DropdownMenuItem onClick={() => handleSort(key as keyof Application)} className="flex items-center">
                              <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort(key as keyof Application)} className="flex items-center">
                              <SortDesc className="mr-2 h-4 w-4" /> Sort Descending
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <div className="relative w-full">
                                <Input
                                  placeholder={`Filter ${key}...`}
                                  value={filters[key as keyof Application] || ''}
                                  onChange={(e) => handleFilter(key as keyof Application, e.target.value)}
                                  className="mt-2 w-full pl-8 pr-4 py-1 bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                                />
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/4 text-primary/60" size={16} />
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {filteredAndSortedApplications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                      layout
                    >
                      <TableCell className="font-medium">{app.applicationNumber}</TableCell>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleActionClick(app.id, 'verify')}
                            className={`transition-colors duration-300 ${
                              app.verified
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                            }`}
                          >
                            {app.verified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          </Button>
                          <motion.span
                            key={`verified-${app.id}`}
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
                            onClick={() => handleActionClick(app.id, 'pay')}
                            className={`transition-colors duration-300 ${
                              app.paid
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                            }`}
                          >
                            {app.paid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          </Button>
                          <motion.span
                            key={`paid-${app.id}`}
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