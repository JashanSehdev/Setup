
import AdminSidebar from "@/components/admin/admin-sidebar/admin-sidebar";
import Sidebar from "@/components/sidebar/side-bar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
        <aside>
            <AdminSidebar />
        </aside>
        <Box sx={{marginLeft: {
          md: '250px'
        }}}>
            {children}
        </Box>
    </div>
  )
}
