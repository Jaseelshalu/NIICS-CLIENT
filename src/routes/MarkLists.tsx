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

type MarksList = {
    id: string
    name: string
    maxMarks: number
    type: 'oral' | 'written'
}

type SortConfig = {
    key: keyof MarksList
    direction: 'asc' | 'desc'
}

const sampleMarks: MarksList[] = [
    { id: '1', name: 'City Central', maxMarks: 100, type: 'oral' },
    { id: '2', name: 'Suburban Institute', maxMarks: 100, type: 'written' },
    { id: '3', name: 'Rural College', maxMarks: 100, type: 'oral' }
]

export default function MarkListPage() {
    const [marks, setCenters] = useState<MarksList[]>(sampleMarks)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [currentCenter, setCurrentCenter] = useState<MarksList | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' })
    const [filters, setFilters] = useState<Partial<Record<keyof MarksList, string>>>({})

    const handleCreateCenter = (center: Omit<MarksList, 'id'>) => {
        const newCenter = { ...center, id: Date.now().toString() }
        setCenters([...marks, newCenter])
        setIsCreateModalOpen(false)
        // toast({ title: "Exam Center Created", description: "The new exam center has been added successfully." })
    }

    const handleEditCenter = (center: MarksList) => {
        setCenters(marks.map(c => c.id === center.id ? center : c))
        setIsEditModalOpen(false)
        setCurrentCenter(null)
        // toast({ title: "Exam Center Updated", description: "The exam center has been updated successfully." })
    }

    const handleDeleteCenter = (id: string) => {
        setCenters(marks.filter(c => c.id !== id))
        // toast({ title: "Exam Center Deleted", description: "The exam center has been removed successfully." })
    }

    const handleSort = (key: keyof MarksList, direction: 'asc' | 'desc') => {
        setSortConfig({ key, direction })
    }

    const handleFilter = (key: keyof MarksList, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }))
    }

    const filteredAndSortedCenters = useMemo(() => {
        return marks
            .filter(center =>
                Object.entries(filters).every(([key, value]) =>
                    center[key as keyof MarksList].toString().toLowerCase().includes(value.toLowerCase())
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
    }, [marks, filters, searchTerm, sortConfig])

    return (
        <div className="container mx-auto p-4 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-primary">Marks List</h1>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Input
                            placeholder="Search marks..."
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
                                <DialogTitle>Create New Mark</DialogTitle>
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
                                    {['name', 'maxMarks', 'type'].map((key) => (
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
                                                        <DropdownMenuItem onClick={() => handleSort(key as keyof MarksList, 'asc')} className="flex items-center">
                                                            <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleSort(key as keyof MarksList, 'desc')} className="flex items-center">
                                                            <SortDesc className="mr-2 h-4 w-4" /> Sort Descending
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <div className="relative w-full">
                                                                <Input
                                                                    placeholder={`Filter ${key}...`}
                                                                    value={filters[key as keyof MarksList] || ''}
                                                                    onChange={(e) => handleFilter(key as keyof MarksList, e.target.value)}
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
                                    {filteredAndSortedCenters.map((mark) => (
                                        <motion.tr
                                            key={mark.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="hover:bg-primary/5 transition-colors duration-300"
                                        >
                                            <TableCell className="font-medium">{mark.name}</TableCell>
                                            <TableCell>{mark.maxMarks}</TableCell>
                                            <TableCell>
                                                {/* ${mark.name === 'active' ?'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} */}
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold`}>
                                                    {mark.type}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Dialog open={isEditModalOpen && currentCenter?.id === mark.id} onOpenChange={(open) => {
                                                        setIsEditModalOpen(open)
                                                        if (!open) setCurrentCenter(null)
                                                    }}>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setCurrentCenter(mark)
                                                                    setIsEditModalOpen(true)
                                                                }}
                                                                className="hover:bg-primary/10 transition-colors duration-300"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Mark</DialogTitle>
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
                                                        onClick={() => handleDeleteCenter(mark.id)}
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
    onSubmit: (center: MarksList) => void
    initialData?: MarksList
}) {
    const [formData, setFormData] = useState<MarksList>(
        initialData || { id: '', name: '', maxMarks: 0, type: 'oral' }
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
                <Label htmlFor="maxMarks">Maximum Marks</Label>
                <Input
                    id="maxMarks"
                    name="maxMarks"
                    value={formData.maxMarks}
                    onChange={handleChange}
                    required
                    type='number'
                    className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                />
            </div>
            <div className="space-y-2">
                <Label>Type</Label>
                <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as 'oral' | 'written' }))}  
                    className="flex space-x-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oral" id="oral" />
                        <Label htmlFor="oral">Oral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="written" id="written" />
                        <Label htmlFor="written">Written</Label>
                    </div>
                </RadioGroup>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                {initialData ? 'Update' : 'Create'} Exam Center
            </Button>
        </form>
    )
}