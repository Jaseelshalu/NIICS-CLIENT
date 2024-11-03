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
  Search,
  SortAsc,
  SortDesc,
  Filter,
  CircleX,
  Trash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ExamCenter } from "@/types/types";
import useExamCenterStore from "@/store/examCenterStore";

type SortConfig = {
  key: keyof ExamCenter;
  direction: "asc" | "desc";
};

export default function ExamCentersPage() {
  const {
    examCenters,
    examCenter,
    setExamCenter,
    createExamCenter,
    getExamCenters,
    updateExamCenter,
    deleteExamCenter,
    isCreateOpen,
    isUpdateOpen,
    isDeleteOpen,
    setIsCreateOpen,
    setIsUpdateOpen,
    setIsDeleteOpen,
    isNull,
    errorMessage,
  } = useExamCenterStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "code",
    direction: "asc",
  });
  const [filters, setFilters] = useState<
    Partial<Record<keyof ExamCenter, string>>
  >({});

  useEffect(() => {
    getExamCenters();
  }, []);

  const handleSort = (key: keyof ExamCenter, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleFilter = (key: keyof ExamCenter, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredAndSortedCenters = useMemo(() => {
    return examCenters
      ?.filter(
        (center) =>
          Object.entries(filters).every(
            ([key, value]) =>
              center[key as keyof ExamCenter] ??
              "".toString().toLowerCase().includes(value.toLowerCase())
          ) &&
          Object.values(center).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
      .sort((a, b) => {
        if ((a[sortConfig.key] ?? "") < (b[sortConfig.key] ?? ""))
          return sortConfig.direction === "asc" ? -1 : 1;
        if ((a[sortConfig.key] ?? "") > (b[sortConfig.key] ?? ""))
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [examCenters, filters, searchTerm, sortConfig]);

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
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60"
              size={18}
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Exam Center</DialogTitle>
              </DialogHeader>
              <CreateForm />
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
                  {["code", "name", "address", "contact", "status"].map(
                    (key) => (
                      <TableHead key={key}>
                        <div className="flex items-center justify-between">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 hover:bg-primary/10 transition-colors duration-300"
                              >
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-background/95 backdrop-blur-sm border-primary/20"
                            >
                              <DropdownMenuItem
                                onClick={() =>
                                  handleSort(key as keyof ExamCenter, "asc")
                                }
                                className="flex items-center"
                              >
                                <SortAsc className="mr-2 h-4 w-4" /> Sort
                                Ascending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleSort(key as keyof ExamCenter, "desc")
                                }
                                className="flex items-center"
                              >
                                <SortDesc className="mr-2 h-4 w-4" /> Sort
                                Descending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <div className="relative w-full">
                                  <Input
                                    placeholder={`Filter ${key}...`}
                                    value={
                                      filters[key as keyof ExamCenter] || ""
                                    }
                                    onChange={(e) =>
                                      handleFilter(
                                        key as keyof ExamCenter,
                                        e.target.value
                                      )
                                    }
                                    className="mt-2 w-full pl-8 pr-4 py-1 bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                                  />
                                  <Search
                                    className="absolute left-2 top-1/2 transform -translate-y-1/4 text-primary/60"
                                    size={16}
                                  />
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableHead>
                    )
                  )}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {examCenters.map((center) => (
                    <motion.tr
                      key={center._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-primary/5 transition-colors duration-300"
                    >
                      <TableCell className="font-medium">
                        {center.code}
                      </TableCell>
                      <TableCell>{center.name}</TableCell>
                      <TableCell>{center.address}</TableCell>
                      <TableCell>{center.contact}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            center.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {center.active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog
                            open={isUpdateOpen}
                            onOpenChange={setIsUpdateOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setExamCenter(center);
                                  setIsUpdateOpen(true);
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
                              <UpdateForm
                                initialData={examCenter as ExamCenter}
                              />
                            </DialogContent>
                          </Dialog>
                          <Dialog
                            open={isDeleteOpen}
                            onOpenChange={setIsDeleteOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setExamCenter(center);
                                  setIsDeleteOpen(true);
                                }}
                                className="hover:bg-red-600 transition-colors duration-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="w-full lg:w-full rounded-lg">
                              <DialogHeader className="sm:text-center">
                                <DialogTitle>
                                  Delete {examCenter?.name}
                                </DialogTitle>
                              </DialogHeader>
                              {examCenter && (
                                <div >
                                  <Label className="block text-sm font-medium text-primary mb-4 sm:text-center">
                                    Are you sure you want to delete{" "}
                                    {examCenter?.name}?
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
                                        deleteExamCenter(examCenter._id);
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
  );
}

function CreateForm() {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    contact: 0,
    active: true,
  });

  const { createExamCenter } = useExamCenterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createExamCenter(formData);
  };

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
          type="number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <RadioGroup
          value={formData.active ? "active" : "inactive"}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              active: value === "active",
            }))
          }
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
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
      >
        Create Exam Center
      </Button>
    </form>
  );
}

function UpdateForm({ initialData }: { initialData: ExamCenter }) {
  const [formData, setFormData] = useState(initialData);

  const { updateExamCenter } = useExamCenterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateExamCenter(formData);
  };

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
          type="number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <RadioGroup
          value={formData.active ? "active" : "inactive"}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              active: value === "active",
            }))
          }
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
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
      >
        Update Exam Center
      </Button>
    </form>
  );
}
