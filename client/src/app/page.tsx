import { DashboardCard } from "@/components/card/card";
import SimpleCard from "@/components/cards/simple-card/Simple-card";
import PeopleIcon from '@mui/icons-material/People';
import { Stack, Typography } from "@mui/material";

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
      <SimpleCard
        title="Hello"
        description = "hello world"
      >
        <Typography>
          Hi this is the best day
        </Typography>
        <Typography>enewnfowenfoew</Typography>
      </SimpleCard>
    </Stack>
  )
}