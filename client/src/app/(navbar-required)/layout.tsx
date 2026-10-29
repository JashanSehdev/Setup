import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
        <aside>
            <Navbar />
        </aside>
        <div style={{marginLeft: '300px'}}>
            {children}
        </div>
    </div>
  )
}
