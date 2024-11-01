'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { toast, Toaster } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, ChevronDown, Search, SortAsc, SortDesc, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type ExamCenter = {
  id: string
  code: string
  name: string
  address: string
  contact: string
  status: 'active' | 'inactive'
}

type SortConfig = {
  key: keyof ExamCenter
  direction: 'asc' | 'desc'
}

const sampleCenters: ExamCenter[] = [
  { id: '1', code: 'EC001', name: 'City Central', address: '123 Main St, Cityville', contact: '+1 234-567-8901', status: 'active' },
  { id: '2', code: 'EC002', name: 'Suburban Institute', address: '456 Oak Rd, Suburbtown', contact: '+1 234-567-8902', status: 'active' },
  { id: '3', code: 'EC003', name: 'Rural College', address: '789 Farm Lane, Countryside', contact: '+1 234-567-8903', status: 'inactive' },
]

export default function ExamCentersPage() {
  const [centers, setCenters] = useState<ExamCenter[]>(sampleCenters)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentCenter, setCurrentCenter] = useState<ExamCenter | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'code', direction: 'asc' })
  const [filters, setFilters] = useState<Partial<Record<keyof ExamCenter, string>>>({})

  const handleCreateCenter = (center: Omit<ExamCenter, 'id'>) => {
    const newCenter = { ...center, id: Date.now().toString() }
    setCenters([...centers, newCenter])
    setIsCreateModalOpen(false)
    // toast({ title: "Exam Center Created", description: "The new exam center has been added successfully." })
  }

  const handleEditCenter = (center: ExamCenter) => {
    setCenters(centers.map(c => c.id === center.id ? center : c))
    setIsEditModalOpen(false)
    setCurrentCenter(null)
    // toast({ title: "Exam Center Updated", description: "The exam center has been updated successfully." })
  }

  const handleDeleteCenter = (id: string) => {
    setCenters(centers.filter(c => c.id !== id))
    // toast({ title: "Exam Center Deleted", description: "The exam center has been removed successfully." })
  }

  const handleSort = (key: keyof ExamCenter, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction })
  }

  const handleFilter = (key: keyof ExamCenter, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }))
  }

  const filteredAndSortedCenters = useMemo(() => {
    return centers
      .filter(center => 
        Object.entries(filters).every(([key, value]) => 
          center[key as keyof ExamCenter].toString().toLowerCase().includes(value.toLowerCase())
        ) &&
        Object.values(center).some(val => 
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
  }, [centers, filters, searchTerm, sortConfig])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Exam Centers List</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" size={18} />
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Exam Center</DialogTitle>
              </DialogHeader>
              <CenterForm onSubmit={handleCreateCenter} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-background to-secondary overflow-hidden">
        {/* <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary">Exam Centers List</CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {['code', 'name', 'address', 'contact', 'status'].map((key) => (
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
                            <DropdownMenuItem onClick={() => handleSort(key as keyof ExamCenter, 'asc')} className="flex items-center">
                              <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort(key as keyof ExamCenter, 'desc')} className="flex items-center">
                              <SortDesc className="mr-2 h-4 w-4" /> Sort Descending
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <div className="relative w-full">
                                <Input
                                  placeholder={`Filter ${key}...`}
                                  value={filters[key as keyof ExamCenter] || ''}
                                  onChange={(e) => handleFilter(key as keyof ExamCenter, e.target.value)}
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredAndSortedCenters.map((center) => (
                    <motion.tr
                      key={center.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell className="font-medium">{center.code}</TableCell>
                      <TableCell>{center.name}</TableCell>
                      <TableCell>{center.address}</TableCell>
                      <TableCell>{center.contact}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          center.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {center.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog open={isEditModalOpen && currentCenter?.id === center.id} onOpenChange={(open) => {
                            setIsEditModalOpen(open)
                            if (!open) setCurrentCenter(null)
                          }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCurrentCenter(center)
                                  setIsEditModalOpen(true)
                                }}
                                className="hover:bg-primary/10 transition-colors duration-300"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Exam Center</DialogTitle>
                              </DialogHeader>
                              {currentCenter && (
                                <CenterForm
                                  onSubmit={handleEditCenter}
                                  initialData={currentCenter}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCenter(center.id)}
                            className="hover:bg-red-600 transition-colors duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
      {/* <Toaster /> */}
    </div>
  )
}

function CenterForm({ onSubmit, initialData }: { 
  onSubmit: (center: ExamCenter) => void
  initialData?: ExamCenter 
}) {
  const [formData, setFormData] = useState<ExamCenter>(
    initialData || { id: '', code: '', name: '', address: '', contact: '', status: 'active' }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <RadioGroup
          value={formData.status}
          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value  as 'active' | 'inactive' }))}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inactive" id="inactive" />
            <Label htmlFor="inactive">Inactive</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
        {initialData ? 'Update' : 'Create'} Exam Center
      </Button>
    </form>
  )
}