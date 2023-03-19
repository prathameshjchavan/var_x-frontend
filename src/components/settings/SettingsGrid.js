import { Grid, IconButton, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import BackwardsIcon from "../../images/BackwardsOutline"
import { styled } from "@mui/material/styles"
import React from "react"

const SettingsGrid = ({
  setSelectedSetting,
  setOpen,
  rows,
  columns,
  initialState,
  rowsPerPage,
  subscriptions,
}) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    container: {
      width: "100%",
      height: "100%",
    },
    header: {
      height: "8rem",
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
    },
    dataGrid: {
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 600,
        textAlign: "center",
      },
      "& .MuiDataGrid-columnSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader": {
        position: "relative",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        paddingLeft: "27.975px",
      },
      "& .MuiDataGrid-columnHeaderTitleContainerContent:not(.MuiDataGrid-columnHeaderTitleContainerContent:has(+ .MuiDataGrid-iconButtonContainer))":
        {
          paddingRight: "1.75rem",
        },
      "& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-iconButtonContainer":
        {
          width: "27.975px",
        },
      "& .MuiDataGrid-menuIcon": {
        marginLeft: "auto",
      },
      "& .MuiDataGrid-columnHeader--moving": {
        backgroundColor: "transparent",
      },
      "& .MuiDataGrid-cell": {
        whiteSpace: "pre-wrap !important",
        maxHeight: "100% !important",
        lineHeight: "initial !important",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        borderBottom: "3px solid #fff",
      },
      "& .MuiDataGrid-row": {
        maxHeight: "100% !important",
      },
      "& .MuiDataGrid-footerContainer": {
        marginTop: "-11rem",
        border: "none",
      },
      "& .MuiTablePagination-displayedRows": {
        color: "#fff ",
        fontWeight: 600,
      },
      "& .MuiSvgIcon-root": {
        fill: "#fff",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: theme.palette.secondary.main,
        border: "none",
      },
      "&.MuiDataGrid-root": {
        border: "none !important",
        borderRadius: 0,
      },
      "& .MuiTablePagination-actions .MuiButtonBase-root .MuiSvgIcon-root": {
        width: "2rem",
        height: "2rem",
      },
      "& .MuiDataGrid-overlay": {
        top: "-8rem",
      },
      "& .MuiDataGrid-main > div": {
        overflow: "hidden",
      },
      "& .MuiDataGrid-virtualScroller": {
        height: "calc(904px - 8rem + 26px) !important",
      },
    },
  }

  // styled components
  const Icon = styled("div")(() => ({
    height: "4rem",
    width: "4rem",
  }))

  return (
    <Grid item container sx={sx.container}>
      <Grid item sx={sx.header}>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <Icon>
            <BackwardsIcon color="#fff" />
          </Icon>
        </IconButton>
      </Grid>
      <DataGrid
        initialState={initialState}
        hideFooterSelectedRowCount
        onRowClick={event =>
          !subscriptions && (setOpen ? setOpen(event.row.id) : null)
        }
        sx={sx.dataGrid}
        columns={columns}
        rows={rows}
        pageSize={rowsPerPage || 5}
      />
    </Grid>
  )
}

export default SettingsGrid
