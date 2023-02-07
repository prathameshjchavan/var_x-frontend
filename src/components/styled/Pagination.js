import { Pagination } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-text": {
    "&:not(.Mui-disabled)": {
      fontFamily: "Montserrat",
      fontSize: "2rem",
    },
    "&:not(.Mui-selected)": {
      color: theme.palette.primary.main,
    },
  },
  "& .Mui-selected": {
    color: "#fff !important",
  },
}))

export default StyledPagination
