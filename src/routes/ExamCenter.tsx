'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, SortAsc, SortDesc, Filter, CheckCircle, XCircle } from "lucide-react"
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

export default function ExamCenterDashboard() {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'applicationNumber', direction: 'asc' })
  const [filters, setFilters] = useState<Partial<Record<keyof Application, string>>>({})

  const handleVerify = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, verified: !app.verified } : app
    ))
  }

  const handlePayment = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, paid: !app.paid } : app
    ))
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
      <h1 className="text-3xl font-bold text-primary">Application Verification</h1>
      
      <div className="flex justify-between items-center">
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
                <AnimatePresence>
                  {filteredAndSortedApplications.map((app) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell className="font-medium">{app.applicationNumber}</TableCell>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleVerify(app.id)}
                            className={`transition-colors duration-300 ${
                              app.verified
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                            }`}
                          >
                            {app.verified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          </Button>
                          <motion.span
                            initial={false}
                            animate={{ opacity: 1 }}
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
                            onClick={() => handlePayment(app.id)}
                            className={`transition-colors duration-300 ${
                              app.paid
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                            }`}
                          >
                            {app.paid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          </Button>
                          <motion.span
                            initial={false}
                            animate={{ opacity: 1 }}
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
    </div>
  )
}