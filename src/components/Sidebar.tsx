import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Building2, Settings, LayoutDashboard, CheckCircle, FileText, Menu, BuildingIcon, KeyRound } from "lucide-react"
import { Link } from 'react-router-dom'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Institutions', href: '/admin/institution-lists', icon: Building2 },
  { name: 'Exam Centres', href: '/admin/exam-centers', icon: BuildingIcon },
  { name: 'Approval', href: '/admin/approval', icon: CheckCircle },
  { name: 'Result Generation', href: '/admin/result-generation', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Credentials', href: '/admin/credentials', icon: KeyRound },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()  // Using useLocation from react-router-dom

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className='w-full bg-red-900'>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        {/* <SheetContent side="left" className="p-0 w-64">
          <SidebarContent pathname={pathname} setOpen={setOpen} />
        </SheetContent> */}
      </Sheet>

      <div className="hidden md:flex md:w-44  lg:w-48 xl:w-56 h-full">
        <SidebarContent pathname={pathname} setOpen={setOpen} />
      </div>
    </>
  )
}

function SidebarContent({ pathname, setOpen }: { pathname: string, setOpen: (open: boolean) => void }) {
  return (
    <div className="flex flex-col h-full bg-background/60 backdrop-blur-lg border-r">
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Admin Dashboard
            </h2>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link 
                    to={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
