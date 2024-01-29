import React, { useState } from 'react';
// import Web3 from 'web3';
// import EscrowLoanContract from '/Users/manas/Desktop/ethHack/server/artifacts/contracts/loan.sol/EscrowLoan.json'; // Import the JSON ABI of your smart contract
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Form2 = () => {
  const [expectedCollateral, setExpectedCollateral] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [installmentDuration, setInstallmentDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amountPayable, setAmountPayable] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const  calcExpectedCollateral = (number) => {
    return number / 2;
  };

  const handleFormSubmit =  (e) => {
    e.preventDefault();
    console.log('Duration in Days:', durationInDays);
    console.log('Installment Duration:', installmentDuration);
    console.log('Interest Rate:', interestRate);
    console.log('Amount Payable:', amountPayable);
    console.log('Agree to Terms:', agreeTerms);
  };
  

  return (
    <div className='flex flex-col justify-center items-center mt-12'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Let's get started
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Expected collateral you can get
            </Typography>
            <Input
              size="lg"
              value={expectedCollateral}
              placeholder={expectedCollateral}
              onChange={(e) => setExpectedCollateral(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              // disabled
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Type duration in days
            </Typography>
            <Input
              size="lg"
              value={durationInDays}
              onChange={(e) => setDurationInDays(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Installment Duration
          </Typography>
          <Input
            size="lg"
            placeholder={installmentDuration}
            onChange={(e) => setInstallmentDuration(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Interest Rate
          </Typography>
          <Input
            size="lg"
            placeholder={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Amount Payable in each installment
          </Typography>
          <Input
            size="lg"
            placeholder={amountPayable}
            onChange={(e) => setAmountPayable(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
         </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Accept
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Form2;