"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Institution } from "@/types/types";
import useInstitutionStore from "@/store/institutionStore";

type SortConfig = {
  key: keyof Institution;
  direction: "asc" | "desc";
};

export default function InstitutionsPage() {
  const {
    institutions,
    institution,
    setInstitution,
    getInstitutions,
    deleteInstitution,
    isCreateOpen,
    isUpdateOpen,
    isDeleteOpen,
    setIsCreateOpen,
    setIsUpdateOpen,
    setIsDeleteOpen,
    isNull,
    errorMessage,
  } = useInstitutionStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "code",
    direction: "asc",
  });
  const [filters, setFilters] = useState<
    Partial<Record<keyof Institution, string>>
  >({});

  const handleSort = (key: keyof Institution, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleFilter = (key: keyof Institution, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredAndSortedCenters = useMemo(() => {
    return institutions
      .filter(
        (institute) =>
          Object.entries(filters).every(([key, value]) =>
            institute[key as keyof Institution]
              ?.toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          ) &&
          Object.values(institute).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
      .sort((a, b) => {
        if (
          (a as Institution | any)[sortConfig.key] <
          (b as Institution | any)[sortConfig.key]
        )
          return sortConfig.direction === "asc" ? -1 : 1;
        if (
          (a as Institution | any)[sortConfig.key] >
          (b as Institution | any)[sortConfig.key]
        )
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [institutions, filters, searchTerm, sortConfig]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Institutions List</h1>
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
            <TableHeader>
              <TableRow>
                {["code", "name", "address", "contact", "seat"].map((key) => (
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
                              handleSort(key as keyof Institution, "asc")
                            }
                            className="flex items-center"
                          >
                            <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleSort(key as keyof Institution, "desc")
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
                                value={filters[key as keyof Institution] || ""}
                                onChange={(e) =>
                                  handleFilter(
                                    key as keyof Institution,
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
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredAndSortedCenters.map((institute) => (
                  <motion.tr
                    key={institute?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-primary/5 transition-colors duration-300"
                  >
                    <TableCell className="font-medium">
                      {institute?.code}
                    </TableCell>
                    <TableCell>{institute?.name}</TableCell>
                    <TableCell>{institute?.address}</TableCell>
                    <TableCell>{institute?.contact}</TableCell>
                    <TableCell>{institute?.seatCount}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInstitution(institute);
                            setIsUpdateOpen(true);
                          }}
                          className="hover:bg-primary/10 transition-colors duration-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setInstitution(institute);
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
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
