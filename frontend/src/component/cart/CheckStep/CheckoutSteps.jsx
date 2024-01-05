import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import "./CheckoutSteps.css";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import BottomTab from "../../../more/BottomTab";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentIcon from "@mui/icons-material/Payment";
const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Thông tin giao hàng</Typography>,
      icon: <FireTruckIcon style={{ width: "40px", height: "40px" }} />,
    },
    {
      label: <Typography>Phương thức thanh toán</Typography>,
      icon: <PaidIcon style={{ width: "40px", height: "40px" }} />,
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <PaymentIcon style={{ width: "40px", height: "40px" }} />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "green" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <BottomTab />
    </>
  );
};

export default CheckoutSteps;
