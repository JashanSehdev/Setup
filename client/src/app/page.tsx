import { DashboardCard } from "@/components/card/card";
import PeopleIcon from '@mui/icons-material/People';
import { Stack } from "@mui/material";

export default function App() {
  return (
    <Stack direction={'row'}>
      <DashboardCard
        title="peoples"
        value= {200}
        description="This is the description"
        icon= {<PeopleIcon/>}
      />
      <DashboardCard
        title="peoples"
        value= {200}
        description="This is the description"
        icon= {<PeopleIcon/>}
      />
    </Stack>
  )
}