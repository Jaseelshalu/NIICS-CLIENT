import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { CircleX, Filter, FilterX, Search, SortAsc, SortDesc } from "lucide-react"

interface TableFilterSortProps<T> {
  filters: Partial<Record<keyof T, string>>;
  handleFilter: (key: keyof T, value: string) => void;
  sortConfig: { key: keyof T; direction: "asc" | "desc" };
  handleSort: (key: keyof T, direction: "asc" | "desc") => void;
  haveFilter?: boolean;
  keyLabel: keyof T;
}

function TableFilterSort<T>({
  filters,
  handleFilter,
  sortConfig,
  handleSort,
  haveFilter = true,
  keyLabel,
}: TableFilterSortProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2 hover:bg-primary/10 transition-colors duration-300">
          {filters[keyLabel] ? <FilterX className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-primary/20 p-1.5">
        <DropdownMenuItem
          onClick={() => {
            if (sortConfig.key !== keyLabel || sortConfig.direction !== "asc") {
              handleSort(keyLabel, "asc");
            }
          }}
          className={`flex items-center ${sortConfig.key === keyLabel && sortConfig.direction === "asc" ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={sortConfig.key === keyLabel && sortConfig.direction === "asc"}
        >
          <SortAsc className="mr-2 h-4 w-4" /> Sort Ascending
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            if (sortConfig.key !== keyLabel || sortConfig.direction !== "desc") {
              handleSort(keyLabel, "desc");
            }
          }}
          className={`flex items-center ${sortConfig.key === keyLabel && sortConfig.direction === "desc" ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={sortConfig.key === keyLabel && sortConfig.direction === "desc"}
        >
          <SortDesc className="mr-2 h-4 w-4" /> Sort Descending
        </DropdownMenuItem>
        {
          haveFilter &&
          <div className="relative w-full">
            <Input
              placeholder={`Filter ${String(keyLabel).charAt(0).toUpperCase() + String(keyLabel).slice(1).replace(/([A-Z])/g, " $1")}...`}
              value={filters[keyLabel] || ""}
              onChange={(e) => handleFilter(keyLabel, e.target.value)}
              className="mt-2 w-full pl-8 pr-8 py-1 bg-background/60 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
              onFocus={(e) => e.stopPropagation()} // Prevent dropdown from closing on focus
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary/60" size={16} />
            <CircleX className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary/60 text-red-600 cursor-pointer" size={16} onClick={() => handleFilter(keyLabel, "")} />
          </div>
        }

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableFilterSort;
