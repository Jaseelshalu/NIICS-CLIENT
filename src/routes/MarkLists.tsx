'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useMemo, useState } from 'react'
import TableFilterSort from '@/components/ui/TableFilterSort'
import { AnimatePresence, motion } from "framer-motion"
import { Edit, Plus, Search, Trash2 } from "lucide-react"

type MarksList = {
    _id: string
    name: string
    maxMarks: number
    description: string
}

type SortConfig = {
    key: keyof MarksList
    direction: 'asc' | 'desc'
}

const sampleMarks: MarksList[] = [
    { _id: '1', name: 'City Central', maxMarks: 100, description: 'This is the best institute' },
    { _id: '2', name: 'Suburban Institute', maxMarks: 100, description: 'This is the best institute in the city' },
    { _id: '3', name: 'Rural College', maxMarks: 100, description: 'This is the best institute in the city' },
]

export default function MarkListPage() {
    const [marks, setMarks] = useState<MarksList[]>(sampleMarks)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [currentMark, setCurrentMark] = useState<MarksList | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' })
    const [filters, setFilters] = useState<Partial<Record<keyof MarksList, string>>>({})

    const handleCreateMark = (center: Omit<MarksList, '_id'>) => {
        const newMark = { ...center, _id: Date.now().toString() }
        setMarks([...marks, newMark])
        setIsCreateModalOpen(false)

    }

    const handleEditMark = (center: MarksList) => {
        setMarks(marks.map(c => c._id === center._id ? center : c))
        setIsEditModalOpen(false)
        setCurrentMark(null)

    }

    const handleDeleteMark = (_id: string) => {
        setMarks(marks.filter(c => c._id !== _id))

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

    const filteredAndSortedMarks = useFilteredAndSorted<MarksList>(
        marks,
        filters,
        searchTerm,
        sortConfig
    );

    useEffect(() => {
        console.log(filteredAndSortedMarks)
    }, [filteredAndSortedMarks])


    return (
        <div className="container mx-auto p-4 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-primary">Marks List</h1>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Input
                            placeholder="Search Marks..."
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
                            <MarkForm onSubmit={handleCreateMark} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="bg-gradient-to-br from-background to-secondary overflow-hidden">
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {['name', 'maxMarks', 'description'].map((key) => (
                                        <TableHead key={key}>
                                            <div className="flex items-center justify-between">
                                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                <TableFilterSort
                                                    filters={filters}
                                                    handleFilter={handleFilter}
                                                    sortConfig={sortConfig}
                                                    handleSort={handleSort}
                                                    keyLabel={key as keyof MarksList}
                                                />
                                            </div>
                                        </TableHead>
                                    ))}
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {filteredAndSortedMarks.length !== 0 &&
                                        filteredAndSortedMarks.map((mark, index) => (
                                            <motion.tr
                                                key={mark._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                className="hover:bg-primary/5 transition-colors duration-300"
                                                layout
                                            >
                                                <TableCell className="font-medium">{mark.name}</TableCell>
                                                <TableCell>{mark.maxMarks}</TableCell>
                                                <TableCell className="font-medium" > {mark.description} </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Dialog open={isEditModalOpen && currentMark?._id === mark._id} onOpenChange={(open) => {
                                                            setIsEditModalOpen(open)
                                                            if (!open) setCurrentMark(null)
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setCurrentMark(mark)
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
                                                                {currentMark && (
                                                                    <MarkForm
                                                                        onSubmit={handleEditMark}
                                                                        initialData={currentMark}
                                                                    />
                                                                )}
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDeleteMark(mark._id)}
                                                            className="hover:bg-red-600 transition-colors duration-300"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    {filteredAndSortedMarks.length === 0 && (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="hover:bg-primary/5 transition-colors duration-300"
                                        >
                                            <TableCell colSpan={9} className="text-center py-4">
                                                <span className="text-sm text-primary">
                                                    Clear the filters to see marks
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
            {/* <Toaster /> */}
        </div>
    )
}

function MarkForm({ onSubmit, initialData }: {
    onSubmit: (center: MarksList) => void
    initialData?: MarksList
}) {
    const [formData, setFormData] = useState<MarksList>(
        initialData || { _id: '', name: '', maxMarks: 0, description: 'oral' }
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
                <Label>Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                {initialData ? 'Update' : 'Create'} Exam Center
            </Button>
        </form>
    )
}