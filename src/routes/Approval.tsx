"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { toast, Toaster } from "@/components/ui/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  SortAsc,
  SortDesc,
  Filter,
  CircleX,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Applicant } from "@/types/types";
import useApplicantStore from "@/store/applicantStore";
import TableFilterSort from "@/components/ui/TableFilterSort";
import { useNavigate } from "react-router-dom";

type SortConfig = {
  key: keyof Applicant;
  direction: "asc" | "desc";
};

export default function Approvals() {
  const redirect = useNavigate()
  const {
    applicants,
    applicant,
    setApplicant,
    editingApplicant,
    setEditingApplicant,
    getApplicants,
    deleteApplicant,
    isCreateOpen,
    isUpdateOpen,
    isDeleteOpen,
    setIsCreateOpen,
    setIsUpdateOpen,
    setIsDeleteOpen,
    isNull,
    errorMessage,
    updateStatus
  } = useApplicantStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "refNumber",
    direction: "asc",
  });
  const [filters, setFilters] = useState<
    Partial<Record<keyof Applicant, string>>
  >({});



  useEffect(() => {
    getApplicants()
  }, [])

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

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <>
      {
        isUpdateOpen && (
          <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{applicant?.accepted ? `Reject` : `Accept`} application</DialogTitle>
              </DialogHeader>
              <p>
                Are you sure you want to {applicant?.accepted ? `reject` : `accept`} the application?
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsUpdateOpen(false)
                }}>Cancel</Button>
                <Button onClick={() => {
                  updateStatus(applicant?._id as string, 'accepted', !applicant?.accepted as boolean)
                }}>{applicant?.accepted ? `Reject` : `Accept`}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog >
        )
      }
      {
        isDeleteOpen && (
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="w-full lg:w-full rounded-lg">
              <DialogHeader className="sm:text-center">
                <DialogTitle>Delete {applicant?.name}</DialogTitle>
              </DialogHeader>
              {applicant && (
                <div>
                  <Label className="block text-sm font-medium text-primary mb-4 sm:text-center">
                    Are you sure you want to delete {applicant?.name}?
                  </Label>
                  <DialogFooter className="flex flex-row sm:justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        setIsDeleteOpen(false);
                      }}
                    >
                      <CircleX className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className={`flex items-center gap-2 `}
                      onClick={() => {
                        deleteApplicant(applicant._id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )
      }
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-primary">Approvals List</h1>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search applicants..."
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

        <Card className="bg-gradient-to-br from-background to-secondary">
          <CardContent>
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
                  {applicants.length === 0 &&
                    errorMessage === "" &&
                    isNull === false &&
                    Array.from({ length: 1 }).map((_, index) =>
                      Array.from({ length: 1 }).map((_, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="transition-colors duration-300 w-full"
                        >
                          <TableCell colSpan={9} className="animate-pulse bg-primary/15 h-12">
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  {isNull && (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell colSpan={9} className="text-center">
                        <span className="text-sm text-primary">
                          No Approvals found
                        </span>
                      </TableCell>
                    </motion.tr>
                  )}

                  {errorMessage && (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell colSpan={6} className="text-center">
                        <span className="text-sm text-red-600">
                          {errorMessage}
                        </span>
                      </TableCell>
                    </motion.tr>
                  )}
                  {applicants.length > 0 &&
                    filteredAndSortedApplicants.length !== 0 &&
                    filteredAndSortedApplicants.map((applcnt, index) => (
                      <motion.tr
                        key={applcnt?._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-primary/5 transition-colors duration-300"
                        layout
                      >
                        <TableCell className="font-medium">{applcnt?.name}</TableCell>
                        <TableCell>{applcnt?.refNumber}</TableCell>
                        <TableCell>{(applcnt?.dob as unknown as string).slice(0, 10)}</TableCell>
                        <TableCell>{applcnt?.email}</TableCell>
                        <TableCell>{applcnt?.examCenter.name}</TableCell>
                        <TableCell>
                          <img src={applcnt?.imageURL} alt={applcnt?.name} className="w-10 h-10 rounded-full object-cover" />
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
                                <img src={applcnt?.aadharDocument} alt="Aadhar Document" className="w-full h-auto" />
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
                                <img src={applcnt?.birthCertificate} alt="Birth Certificate" className="w-full h-auto" />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setApplicant(applcnt)
                                setIsUpdateOpen(true)
                              }}
                              className={`transition-colors duration-300 ${applcnt?.accepted
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                                }`}
                            >
                              {applcnt?.accepted ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                            <motion.span
                              key={`approved-${applcnt?._id}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {applcnt?.accepted ? 'Approved' : 'Not Approved'}
                            </motion.span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // set applicant to local storage

                                setApplicant(applcnt)
                                setEditingApplicant(applcnt)
                                localStorage.setItem('applicant', JSON.stringify(applcnt))
                                localStorage.setItem('editingApplicant', JSON.stringify(applcnt))
                                setTimeout(() => {
                                  redirect('/edit-application/personal-details')
                                }, 100)
                              }}
                              className="hover:bg-primary/10 transition-colors duration-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setApplicant(applcnt)
                                setIsDeleteOpen(true);
                              }}
                              className="hover:bg-red-600 transition-colors duration-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                            Clear the filters to see approvals
                          </span>
                        </TableCell>
                      </motion.tr>
                    )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
