import { Grid, IconButton } from "@mui/material"
import React, { useCallback } from "react"
import { styled } from "@mui/material/styles"
import BackwardsIcon from "../../images/BackwardsOutline"
import editIcon from "../../images/edit.svg"
import saveIcon from "../../images/save.svg"

const Edit = ({ setSelectedSetting, edit, setEdit }) => {
  // sx prop
  const sx = {
    editContainer: {
      borderLeft: "4px solid #fff",
    },
    icon: {
      height: "8rem",
      width: "8rem",
    },
  }

  // functions
  const handleEdit = useCallback(() => {
    setEdit(!edit)
  }, [edit, setEdit])

  // styled components
  const IconWrapper = styled("span")(() => sx.icon)
  const Icon = styled("img")(() => sx.icon)

  return (
    <Grid
      item
      container
      sx={sx.editContainer}
      justifyContent="space-evenly"
      alignItems="center"
      xs={6}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <IconWrapper>
            <BackwardsIcon color="#fff" />
          </IconWrapper>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleEdit}>
          <Icon
            src={edit ? saveIcon : editIcon}
            alt={`edit ${edit ? "save" : "settings"}`}
          />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Edit
