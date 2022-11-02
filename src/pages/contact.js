import { Button, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import Layout from "../components/ui/layout"
import address from "../images/address.svg"
import phone from "../images/phone-adornment.svg"
import Email from "../images/EmailAdornment"
import send from "../images/send.svg"
import { useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"

const ContactPage = () => {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")

  // sx prop
  const sx = {
    mainContainer: {
      height: "45rem",
      backgroundColor: theme.palette.primary.main,
      marginBottom: "10rem",
      // [theme.breakpoints.down("lg")]: {
      //   marginTop: "8rem",
      //   height: "90rem",
      // },
    },
    formWrapper: {
      height: "100%",
      // [theme.breakpoints.down("md")]: {
      //   height: "50%",
      //   marginTop: "-8rem",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   width: "100%",
      // },
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
      // [theme.breakpoints.down("sm")]: {
      //   width: "30rem",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   width: "100%",
      // },
    },
    infoContainer: {
      height: "21.25rem",
      // [theme.breakpoints.down("xs")]: {
      //   height: "15.25rem",
      // },
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
    },
    contactInfo: {
      fontSize: "1.5rem",
      marginLeft: "1rem",
    },
    contactEmailIcon: {
      height: "2.25rem",
      width: "3rem",
    },
    middleInfo: {
      borderTop: "2px solid #fff",
      borderBottom: "2px solid #fff",
    },
    textField: {
      width: "30rem",
    },
    fieldContainer: {
      marginBottom: "1rem",
    },
    multilineContainer: {
      marginTop: "1rem",
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

  const EmailIconContainer = styled("div")(() => ({
    ...sx.contactEmailIcon,
  }))

  return (
    <Layout>
      <Grid
        container
        sx={sx.mainContainer}
        justifyContent="space-around"
        alignItems="center"
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
                <Grid item sx={sx.fieldContainer}>
                  <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="standard"
                    placeholder="Name"
                    sx={sx.textField}
                  />
                </Grid>
                <Grid item sx={sx.fieldContainer}>
                  <TextField
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="standard"
                    placeholder="Email"
                    sx={sx.textField}
                  />
                </Grid>
                <Grid item sx={sx.fieldContainer}>
                  <TextField
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    variant="standard"
                    placeholder="Phone Number"
                    sx={sx.textField}
                  />
                </Grid>
                <Grid item sx={sx.multilineContainer}>
                  <TextField
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    variant="standard"
                    multiline
                    InputProps={{
                      disableUnderline: true,
                    }}
                    rows={8}
                    placeholder="Message"
                    sx={sx.textField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              component={Button}
              item
              sx={{ ...sx.buttonContainer, ...sx.blockContainer }}
            >
              <Typography variant="h4">send message</Typography>
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
            <Grid item container alignItems="center">
              <Grid item sx={sx.iconContainer}>
                <ContactIcon src={address} alt="address" />
              </Grid>
              <Grid item>
                <Typography variant="h2" sx={sx.contactInfo}>
                  1234 S Example St Wichita, KS 67111
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" sx={sx.middleInfo}>
              <Grid item sx={sx.iconContainer}>
                <ContactIcon src={phone} alt="phone" />
              </Grid>
              <Grid item>
                <Typography variant="h2" sx={sx.contactInfo}>
                  (555) 555-5555
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item sx={sx.iconContainer}>
                <EmailIconContainer>
                  <Email color="#fff" />
                </EmailIconContainer>
              </Grid>
              <Grid item>
                <Typography variant="h2" sx={sx.contactInfo}>
                  zachary@var-x.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
