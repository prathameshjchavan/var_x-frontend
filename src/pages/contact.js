import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import React, { useState } from "react"
import Layout from "../components/ui/layout"
import { useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import address from "../images/address.svg"
import Email from "../images/EmailAdornment"
import send from "../images/send.svg"
import nameAdornment from "../images/name-adornment.svg"
import PhoneAdornment from "../images/PhoneAdornment"
import validate from "../components/ui/validate"

const ContactPage = () => {
  const theme = useTheme()
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    phone: null,
    message: null,
  })
  const matchesVertical = useMediaQuery("(max-width: 1280px)")
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const disabled =
    Object.values(errors).includes(true) || Object.values(errors).includes(null)

  // sx prop
  const sx = {
    mainContainer: {
      height: "50rem",
      backgroundColor: theme.palette.primary.main,
      marginBottom: "10rem",
      "@media (max-width: 1280px)": {
        marginTop: "8rem",
        height: "90rem",
      },
    },
    formWrapper: {
      height: "100%",
      "@media (max-width: 1280px)": {
        height: "50%",
        marginTop: "-8rem",
      },
      "@media (max-width: 500px)": {
        width: "100%",
      },
    },
    formContainer: {
      height: "100%",
    },
    buttonContainer: {
      marginBottom: "-4rem",
      textTransform: "none",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    blockContainer: {
      backgroundColor: theme.palette.secondary.main,
      height: "8rem",
      width: "40rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media (max-width: 700px)": {
        width: "30rem",
      },
      "@media (max-width: 500px)": {
        width: "100%",
      },
    },
    infoContainer: {
      height: "21.25rem",
      [theme.breakpoints.down("sm")]: {
        height: "15.25rem",
      },
    },
    titleContainer: {
      marginTop: "-4rem",
    },
    iconContainer: {
      borderRight: "2px solid #fff",
      height: "7rem",
      width: "8rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        height: "5rem",
        width: "6rem",
      },
    },
    contactInfo: {
      fontSize: "1.5rem",
      marginLeft: "1rem",
    },
    contactEmailIcon: {
      height: "2.25rem",
      width: "3rem",
    },
    contactIcon: {
      height: "3rem",
      width: "3rem",
    },
    middleInfo: {
      borderTop: "2px solid #fff",
      borderBottom: "2px solid #fff",
    },
    textField: {
      width: "30rem",
      "@media (max-width: 700px)": {
        width: "20rem",
      },
    },
    fieldContainer: {
      marginBottom: "1rem",
    },
    multiline: {
      "& .MuiInput-input": {
        border: "2px solid #fff",
        borderRadius: "10px",
        padding: "1rem",
      },
      "& .Mui-error > .MuiInput-input": {
        border: `2px solid ${theme.palette.error.main}`,
      },
    },
    multilineContainer: {
      marginTop: "1rem",
    },
    emailAdornment: {
      height: 17,
      width: 22,
      marginBottom: "10px",
    },
    phoneAdornment: {
      width: 25.173,
      height: 25.122,
    },
    buttonDisabled: {
      backgroundColor: theme.palette.grey[500],
    },
    sendMessage: {
      "@media (max-width: 400px)": {
        fontSize: "2.5rem",
      },
    },
  }

  // TextField props
  const fields = {
    name: {
      helperText: "You must enter a name",
      placeholder: "Name",
      adornment: <img src={nameAdornment} alt="name" />,
    },
    email: {
      helperText: "Invalid email",
      placeholder: "Email",
      adornment: (
        <div style={sx.emailAdornment}>
          <Email color={theme.palette.secondary.main} />
        </div>
      ),
    },
    phone: {
      helperText: "Invalid phone",
      placeholder: "Phone Number",
      adornment: (
        <div style={sx.phoneAdornment}>
          <PhoneAdornment color={theme.palette.secondary.main} />
        </div>
      ),
    },
    message: {
      helperText: "You must enter a message",
      placeholder: "Message",
    },
  }

  // styled components
  const ContactIcon = styled("img")(() => ({
    height: "3rem",
    width: "3rem",
  }))

  const SendIcon = styled("img")(() => ({
    marginLeft: "2rem",
  }))

  // Contact Info
  const info = [
    {
      label: (
        <span>
          1234 S Example St {matchesSM ? <br /> : null}Wichita, KS 67111
        </span>
      ),
      icon: <ContactIcon src={address} alt="address" />,
    },
    {
      label: "(555) 555-5555",
      icon: (
        <div style={sx.contactIcon}>
          <PhoneAdornment />
        </div>
      ),
    },
    {
      label: "zachary@var-x.com",
      icon: (
        <div style={sx.contactEmailIcon}>
          <Email color="#fff" />
        </div>
      ),
    },
  ]

  // functions
  const getButtonSx = () => {
    let buttonSx = { ...sx.buttonContainer, ...sx.blockContainer }
    if (disabled) buttonSx = { ...buttonSx, ...sx.buttonDisabled }
    return buttonSx
  }

  return (
    <Layout>
      <Grid
        container
        sx={sx.mainContainer}
        justifyContent="space-around"
        alignItems="center"
        direction={matchesVertical ? "column" : "row"}
      >
        {/* Contact Form */}
        <Grid item sx={sx.formWrapper}>
          <Grid
            container
            sx={sx.formContainer}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={{ ...sx.titleContainer, ...sx.blockContainer }}>
              <Typography variant="h4">Contact Us</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {Object.keys(fields).map(field => {
                  const validateHelper = event => {
                    return validate({ [field]: event.target.value })
                  }
                  const fieldSx =
                    field === "message"
                      ? { ...sx.textField, ...sx.multiline }
                      : sx.textField

                  return (
                    <Grid
                      key={field}
                      item
                      sx={
                        field === "message"
                          ? sx.multilineContainer
                          : sx.fieldContainer
                      }
                    >
                      <TextField
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e)
                          if (errors[field] || valid[field] === true)
                            setErrors({ ...errors, [field]: !valid[field] })
                          setValues({ ...values, [field]: e.target.value })
                        }}
                        onBlur={e => {
                          const valid = validateHelper(e)
                          setErrors({ ...errors, [field]: !valid[field] })
                        }}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        variant="standard"
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        placeholder={fields[field].placeholder}
                        sx={fieldSx}
                        InputProps={{
                          startAdornment:
                            field !== "message" ? (
                              <InputAdornment position="start">
                                {fields[field].adornment}
                              </InputAdornment>
                            ) : undefined,
                          disableUnderline: field === "message",
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid
              component={Button}
              disabled={disabled}
              item
              sx={getButtonSx()}
            >
              <Typography variant="h4" sx={sx.sendMessage}>
                send message
              </Typography>
              <SendIcon src={send} alt="send message" />
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={sx.infoContainer}
          >
            {info.map(({ icon, label }, i) => (
              <Grid
                key={i}
                item
                container
                alignItems="center"
                sx={i === 1 ? sx.middleInfo : undefined}
              >
                <Grid item sx={sx.iconContainer}>
                  {icon}
                </Grid>
                <Grid item>
                  <Typography variant="h2" sx={sx.contactInfo}>
                    {label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
