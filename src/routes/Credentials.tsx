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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Credential } from "@/types/types";
import useCredentialStore from "@/store/credentialStore";

type SortConfig = {
  key: keyof Credential;
  direction: "asc" | "desc";
};

export default function Credentials() {
  const {
    credentials,
    credential,
    setCredential,
    getCredentials,
    deleteCredential,
    isCreateOpen,
    isUpdateOpen,
    isDeleteOpen,
    setIsCreateOpen,
    setIsUpdateOpen,
    setIsDeleteOpen,
    isNull,
    errorMessage,
  } = useCredentialStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "userName",
    direction: "asc",
  });
  const [filters, setFilters] = useState<
    Partial<Record<keyof Credential, string>>
  >({});

  useEffect(() => {
    getCredentials()
  }, [])

  const handleSort = (key: keyof Credential, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleFilter = (key: keyof Credential, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredAndSortedCredentials = useMemo(() => {
    return credentials
      .filter(
        (cred) =>
          Object.entries(filters).every(([key, value]) =>
            cred[key as keyof Credential]
              ?.toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          ) &&
          Object.values(cred).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
      .sort((a, b) => {
        if (
          (a as Credential | any)[sortConfig.key] <
          (b as Credential | any)[sortConfig.key]
        )
          return sortConfig.direction === "asc" ? -1 : 1;
        if (
          (a as Credential | any)[sortConfig.key] >
          (b as Credential | any)[sortConfig.key]
        )
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [credentials, filters, searchTerm, sortConfig]);

  return (
    <>
      {isCreateOpen && (
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Credential</DialogTitle>
            </DialogHeader>
            <CreateForm />
          </DialogContent>
        </Dialog>
      )}

      {isUpdateOpen && (
        <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Credential</DialogTitle>
            </DialogHeader>
            <UpdateForm initialData={credential as Credential} />
          </DialogContent>
        </Dialog>
      )}

      {isDeleteOpen && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="w-full lg:w-full rounded-lg">
            <DialogHeader className="sm:text-center">
              <DialogTitle>Delete {credential?.userName}</DialogTitle>
            </DialogHeader>
            {credential && (
              <div>
                <Label className="block text-sm font-medium text-primary mb-4 sm:text-center">
                  Are you sure you want to delete {credential?.userName}?
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
                      deleteCredential(credential._id);
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
      )}
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-primary">Credentials List</h1>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search centers..."
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
                setIsCreateOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Create New
            </Button>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-background to-secondary">
          <CardContent>
            <Table>
              <TableHeader><TableRow>
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
                          <DropdownMenuItem onClick={() => handleSort(key as keyof Credential, "asc")} className="flex items-center">
                            <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSort(key as keyof Credential, "desc")} className="flex items-center">
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
                <AnimatePresence>
                  {credentials.length === 0 &&
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
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
                          <td className="animate-pulse bg-primary/15 h-12 w-auto" />
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
                      <TableCell colSpan={6} className="text-center">
                        <span className="text-sm text-primary">
                          No Credentials found
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
                  {credentials.length > 0 &&

                    filteredAndSortedCredentials.map((cred) => (
                      <motion.tr
                        key={cred._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-primary/5 transition-colors duration-300"
                        layout
                      >
                        <TableCell className="font-medium">{cred?.userName}</TableCell>
                        <TableCell>{cred?.examCenter?.name}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsUpdateOpen(true)}
                              className="hover:bg-primary/10 transition-colors duration-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setIsDeleteOpen(true)}
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function CreateForm() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    examCenter: {
      _id: '',
      code: '',
      name: '',
      address: '',
      contact: 0,
      active: false,
    },
  });

  const { createCredential } = useCredentialStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCredential(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userName">Code</Label>
        <Input
          id="userName"
          name="userName"
          value={formData.userName}
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
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      {/* <div className="space-y-2">
        <Label htmlFor="examCenter">Exam Center</Label>
        <select
          id="examCenter"
          name="examCenter"
          value={formData.examCenter._id}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        >
          <option value="">Select Exam Center</option>
          <option value="1">Exam Center 1</option>
          <option value="2">Exam Center 2</option>
          <option value="3">Exam Center 3</option>
        </select>
      </div> */}
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
      >
        Create Credential
      </Button>
    </form>
  );
}

function UpdateForm({ initialData }: { initialData: Credential }) {
  const [formData, setFormData] = useState(initialData);

  const { updateCredential } = useCredentialStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCredential(formData);
  };

  return (
    // <form onSubmit={handleSubmit} className="space-y-4">
    //   <div className="space-y-2">
    //     <Label htmlFor="code">Code</Label>
    //     <Input
    //       id="code"
    //       name="code"
    //       value={formData.code}
    //       onChange={handleChange}
    //       required
    //       className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <Label htmlFor="name">Name</Label>
    //     <Input
    //       id="name"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       required
    //       className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <Label htmlFor="address">Address</Label>
    //     <Input
    //       id="address"
    //       name="address"
    //       value={formData.address}
    //       onChange={handleChange}
    //       required
    //       className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <Label htmlFor="contact">Contact</Label>
    //     <Input
    //       id="contact"
    //       name="contact"
    //       type="number"
    //       value={formData.contact}
    //       onChange={handleChange}
    //       required
    //       className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <Label htmlFor="seatCount">Seat Count</Label>
    //     <Input
    //       id="seatCount"
    //       name="seatCount"
    //       type="number"
    //       value={formData.seatCount}
    //       onChange={handleChange}
    //       required
    //       className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
    //     />
    //   </div>
    //   <Button
    //     type="submit"
    //     className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
    //   >
    //     Update Credential
    //   </Button>
    // </form>
    <></>
  );
}
