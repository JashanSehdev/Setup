import { InputAdornment, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FiltersTray from "./filters-tray/filters-tray";
import { SubmitHandler, useForm } from "react-hook-form";
import { FilterInput } from "./user-toolbar.type";

export default function UserToolbar({
  handleFiltersChange,
}: {
  handleFiltersChange: (data : FilterInput) => void;
}) {
  const { control, handleSubmit, register, reset } = useForm<FilterInput>();

  const onSubmit: SubmitHandler<FilterInput> = async (data: FilterInput) => {
    handleFiltersChange(data);
  };

  const onApply = handleSubmit(onSubmit);
  return (
    <form onSubmit={onApply}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "streach", sm: "center" },
        }}
      >
        <TextField
          {...register("search")}
          size="small"
          placeholder="Search..."
          sx={{ flex: 1 }}
          // onKeyDown={handleSearch}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "small" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack direction="row" spacing={1}>
          <FiltersTray onApply={onApply} reset={reset} control={control} />
        </Stack>
      </Stack>
    </form>
  );
}
