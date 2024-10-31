'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Save } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Student = {
  id: string
  name: string
  applicationNumber: string
  marks: {
    oral: Record<string, number>
    written: Record<string, number>
  }
}

export default function MarksEntryPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', applicationNumber: 'APP001', marks: { oral: {}, written: {} } },
    { id: '2', name: 'Jane Smith', applicationNumber: 'APP002', marks: { oral: {}, written: {} } },
  ])
  const [oralColumns, setOralColumns] = useState<string[]>(['Oral 1'])
  const [writtenColumns, setWrittenColumns] = useState<string[]>(['Written 1'])

  const addColumn = (type: 'oral' | 'written') => {
    if (type === 'oral') {
      setOralColumns([...oralColumns, `Oral ${oralColumns.length + 1}`])
    } else {
      setWrittenColumns([...writtenColumns, `Written ${writtenColumns.length + 1}`])
    }
  }

  const handleMarkChange = (studentId: string, type: 'oral' | 'written', column: string, value: string) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          marks: {
            ...student.marks,
            [type]: {
              ...student.marks[type],
              [column]: parseFloat(value) || 0
            }
          }
        }
      }
      return student
    }))
  }

  const saveMarks = () => {
    console.log('Saving marks:', students)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Marks Entry</h1>
      
      <Card className="bg-gradient-to-br from-background to-secondary overflow-hidden">
        <CardHeader className="bg-background/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-primary flex justify-between items-center">
            Student Marks
            <Button onClick={saveMarks} className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
              <Save className="mr-2 h-4 w-4" /> Save Marks
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Application Number</TableHead>
                  {oralColumns.map((column, index) => (
                    <TableHead key={column} className="font-bold text-center">
                      {column}
                    </TableHead>
                  ))}
                  {writtenColumns.map((column, index) => (
                    <TableHead key={column} className="font-bold text-center">
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {students.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.applicationNumber}</TableCell>
                      {oralColumns.map((column) => (
                        <TableCell key={column}>
                          <Input
                            type="number"
                            value={student.marks.oral[column] || ''}
                            onChange={(e) => handleMarkChange(student.id, 'oral', column, e.target.value)}
                            className="w-20 text-center bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                          />
                        </TableCell>
                      ))}
                      {writtenColumns.map((column) => (
                        <TableCell key={column}>
                          <Input
                            type="number"
                            value={student.marks.written[column] || ''}
                            onChange={(e) => handleMarkChange(student.id, 'written', column, e.target.value)}
                            className="w-20 text-center bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                          />
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button onClick={() => addColumn('oral')} className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
          <Plus className="mr-2 h-4 w-4" /> Add Oral Column
        </Button>
        <Button onClick={() => addColumn('written')} className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
          <Plus className="mr-2 h-4 w-4" /> Add Written Column
        </Button>
      </div>
    </div>
  )
}