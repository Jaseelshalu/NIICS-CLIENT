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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertCircle, Plus, Search, Edit, Trash2, Filter, SortAsc, SortDesc } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample array of exam centers
const examCenters = [
  { id: "1", name: "City Central Exam Center" },
  { id: "2", name: "Suburban Institute Testing Facility" },
  { id: "3", name: "Metropolitan University Exam Hall" },
  { id: "4", name: "Rural College Assessment Center" },
  { id: "5", name: "Coastal Academy Examination Complex" },
]

// Sample array of existing credentials
const initialCredentials = [
  { id: "1", username: "john_doe", examCenter: "1" },
  { id: "2", username: "jane_smith", examCenter: "2" },
  { id: "3", username: "bob_johnson", examCenter: "3" },
]

type Credential = {
  id: string
  username: string
  examCenter: string
}

type SortConfig = {
  key: keyof Credential
  direction: 'asc' | 'desc'
}

export default function CredentialManagementPage() {
  const [credentials, setCredentials] = useState<Credential[]>(initialCredentials)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [examCenter, setExamCenter] = useState("")
  const [error, setError] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'username', direction: 'asc' })
  const [filters, setFilters] = useState<Partial<Record<keyof Credential, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password || !examCenter) {
      setError("Please fill in all fields.")
      return
    }

    const newCredential: Credential = {
      id: Date.now().toString(),
      username,
      examCenter,
    }

    setCredentials([...credentials, newCredential])
    setIsCreateModalOpen(false)
    setUsername("")
    setPassword("")
    setExamCenter("")
  }

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit credential with id:", id)
  }

  const handleDelete = (id: string) => {
    setCredentials(credentials.filter(cred => cred.id !== id))
  }

  const handleSort = (key: keyof Credential) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (key: keyof Credential, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }))
  }

  const filteredAndSortedCredentials = useMemo(() => {
    return credentials
      .filter(cred =>
        Object.entries(filters).every(([key, value]) =>
          cred[key as keyof Credential].toLowerCase().includes(value.toLowerCase())
        ) &&
        Object.values(cred).some(val =>
          val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
  }, [credentials, filters, searchTerm, sortConfig])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Credential Management</h1>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search credentials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" size={18} />
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                <Plus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Credential</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-background/50 border-input/50 focus:border-primary transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-input/50 focus:border-primary transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examCenter">Exam Center</Label>
                  <Select value={examCenter} onValueChange={setExamCenter}>
                    <SelectTrigger className="bg-background/50 border-input/50 focus:border-primary transition-colors duration-300">
                      <SelectValue placeholder="Select an exam center" />
                    </SelectTrigger>
                    <SelectContent>
                      {examCenters.map((center) => (
                        <SelectItem key={center.id} value={center.id}>
                          {center.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {error && (
                  <div className="flex items-center text-destructive space-x-2">
                    <AlertCircle size={20} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                <Button type="submit" className="w-full">Create Credential</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-background to-secondary overflow-hidden">
        <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary">Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {['username', 'examCenter'].map((key) => (
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
                            <DropdownMenuItem onClick={() => handleSort(key as keyof Credential)} className="flex items-center">
                              <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort(key as keyof Credential)} className="flex items-center">
                              <SortDesc className="mr-2 h-4 w-4" /> Sort Descending
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <div className="relative w-full">
                                <Input
                                  placeholder={`Filter ${key}...`}
                                  value={filters[key as keyof Credential] || ''}
                                  onChange={(e) => handleFilter(key as keyof Credential, e.target.value)}
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
                <AnimatePresence initial={false}>
                  {filteredAndSortedCredentials.map((cred, index) => (
                    <motion.tr
                      key={cred.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                      layout
                    >
                      <TableCell className="font-medium">{cred.username}</TableCell>
                      <TableCell>{examCenters.find(center => center.id === cred.examCenter)?.name}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(cred.id)}
                            className="hover:bg-primary/10 transition-colors duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(cred.id)}
                            className="hover:bg-destructive/90 transition-colors duration-300"
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
    </div>
  )
}