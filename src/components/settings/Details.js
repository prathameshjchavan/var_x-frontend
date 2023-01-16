import { Grid, FormControlLabel, Switch, useMediaQuery } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import fingerprint from "../../images/fingerprint.svg"
import NameAdornment from "../../images/NameAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import Fields from "../auth/Fields"
import { getEmailPasswordFields } from "../auth/Login"
import { styled } from "@mui/material/styles"
import Slots from "./Slots"

const Details = ({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
  checkout,
  billing,
  setBilling,
  billingValues,
  setBillingValues,
  noSlots,
}) => {
  const isMounted = useRef(false)
  const [visible, setVisible] = useState(false)
  const matchesVertical = useMediaQuery("(max-width: 1300px)")
  const matchesXS = useMediaQuery("(max-width: 700px)")
  const emailPasswordFields = getEmailPasswordFields(
    false,
    false,
    visible,
    setVisible,
    true
  )
  const PhoneAdornmentContainer = styled("div")(() => ({
    height: 25.122,
    width: 25.173,
  }))
  const namePhoneFields = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <NameAdornment color="#fff" />,
    },
    phone: {
      helperText: "invalid phone number",
      placeholder: "Phone",
      startAdornment: (
        <PhoneAdornmentContainer>
          <PhoneAdornment />
        </PhoneAdornmentContainer>
      ),
    },
  }
  let fields = [namePhoneFields, emailPasswordFields]
  if (checkout) {
    fields = [
      {
        name: namePhoneFields.name,
        email: emailPasswordFields.email,
        phone: namePhoneFields.phone,
      },
    ]
  }

  // sx prop
  const sx = {
    detailsContainer: {
      position: "relative",
      borderBottom: matchesVertical ? "4px solid #fff" : undefined,
      height: matchesVertical ? "30rem" : undefined,
    },
    visibleIcon: {
      padding: 0,
    },
    emailAdornment: {
      height: 17,
      width: 22,
      marginBottom: 10,
    },
    fieldContainer: {
      marginBottom: matchesXS ? "1rem" : "2rem",
      "& > :not(:first-of-type)": {
        marginLeft: !matchesXS ? "5rem" : undefined,
        marginTop: "1rem",
      },
    },
    fieldContainerCart: {
      "& > *": {
        marginBottom: "1rem",
      },
    },
    slotContainer: {
      position: "absolute",
      bottom: "0px",
    },
    switchWrapper: {
      marginRight: "4px",
      "& .MuiTypography-root": {
        color: "#fff",
        fontWeight: "bold",
      },
    },
  }

  // styled components
  const Icon = styled("img")(() => ({
    marginBottom: matchesXS || checkout ? "1rem" : "3rem",
    marginTop: checkout ? "-2rem" : undefined,
  }))

  // useEffect
  useEffect(() => {
    if (noSlots || user.name === "Guest") return

    if (checkout) {
      setValues(user.contactInfo[slot])
    } else {
      setValues({ ...user.contactInfo[slot], password: "********" })
    }
  }, [slot, noSlots, user.contactInfo, setValues, checkout])

  useEffect(() => {
    if (checkout) return

    const changed = Object.keys(user.contactInfo[slot]).some(
      field => values[field] !== user.contactInfo[slot][field]
    )

    setChangesMade(changed)
  }, [user, slot, values, setChangesMade, checkout])

  useEffect(() => {
    if (noSlots) {
      isMounted.current = false
      return
    }
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    if (billing === false && isMounted.current) {
      setValues(billingValues)
    } else {
      setBillingValues(values)
    }
  }, [billing])

  return (
    <Grid
      item
      container
      direction="column"
      lg={checkout ? 12 : 6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      sx={sx.detailsContainer}
    >
      <Grid item>
        <Icon src={fingerprint} alt="details settings" />
      </Grid>
      {fields.map((pair, index) => (
        <Grid
          container
          sx={checkout ? sx.fieldContainerCart : sx.fieldContainer}
          direction={matchesXS || checkout ? "column" : "row"}
          justifyContent="center"
          alignItems={matchesXS || checkout ? "center" : undefined}
          key={index}
        >
          <Fields
            fields={pair}
            values={billing === slot && !noSlots ? billingValues : values}
            setValues={
              billing === slot && !noSlots ? setBillingValues : setValues
            }
            errors={errors}
            setErrors={setErrors}
            isWhite
            disabled={checkout ? false : !edit}
            settings={!checkout}
          />
        </Grid>
      ))}
      {!noSlots && (
        <Grid
          item
          container
          justifyContent={checkout ? "space-between" : undefined}
          sx={sx.slotContainer}
        >
          <Slots slot={slot} setSlot={setSlot} checkout={checkout} />
          {checkout && (
            <Grid item>
              <FormControlLabel
                sx={sx.switchWrapper}
                label="Billing"
                labelPlacement="start"
                control={
                  <Switch
                    checked={billing === slot}
                    onChange={() => setBilling(billing === slot ? false : slot)}
                    color="secondary"
                  />
                }
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default Details
