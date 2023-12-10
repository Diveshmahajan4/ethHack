import React, { useState } from 'react';
import lighthouse from '@lighthouse-web3/sdk'
import Web3 from 'web3';
// import Web3 from 'web3';
// import EscrowLoanContract from '/Users/manas/Desktop/ethHack/server/artifacts/contracts/loan.sol/EscrowLoan.json'; // Import the JSON ABI of your smart contract

// import { ContractABI } from "./EscrowLoan.json";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Form = () => {
  const [expectedCollateral, setExpectedCollateral] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [installmentDuration, setInstallmentDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amountPayable, setAmountPayable] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleAccept = async () => {

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const contractAddress = '0x303622C872C3B550A35Be37577C6F5C906F5b7a9';

      
        const contractABI = [
          // ... Your contract ABI here
          {

            "constant": false,
            "inputs": [
              {
                "name": "_tokenAddress",
                "type": "address"
              },
              {
                "name": "_tokenId",
                "type": "uint256"
              },
              {
                "name": "_interestRate",
                "type": "uint256"
              },
              {
                "name": "_maxLoanAmount",
                "type": "uint256"
              },
              {
                "name": "_loanCompleteTime",
                "type": "uint256"
              },
              {
                "name": "_installmentPeriod",
                "type": "uint256"
              }
            ],
            "name": "createLoan",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
        ];

        

        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        const tokenAddress = '0x303622C872C3B550A35Be37577C6F5C906F5b7a9';
        const tokenId = 1236565455;


        const result = await contractInstance.methods
          .createLoan(tokenAddress, tokenId, interestRate, 45, 45, 45)
          .send({ from: accounts[0] });

      
        console.log('Transaction successful:', result);
        alert('Loan created successfully!');

      } catch (error) {
        // console.error('Error creating loan:', error);
        console.log('Error creating loan. Please check the console for details.');
      }

    }else{
      console.log('MetaMask not detected. Please install MetaMask and try again.');
    }
  }

  // const  calcExpectedCollateral = (number) => {
  //   return number / 2;
  // };

  const apiKey = '4c361584.906b4ca78031415aba23651ecc6fa233';
  const hashId =  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';

  async function addItem() {

    try {
      await axios.post('http://localhost:5000/add', { hashId });
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error.message);
      alert('Failed to add item. Please try again.');
    }
  }


  const  handleFormSubmit =  (e) => {
    e.preventDefault();

    const formData = {
        "expectedCollateral": expectedCollateral,
        "durationInDays": durationInDays,
        "installmentDuration": installmentDuration,
        "interestRate": interestRate,
        "amountPayable": amountPayable,
        "agreeTerms": agreeTerms,
        "hashId": hashId
      };

      uploadData(JSON.stringify(formData));
      addItem();
    
      
    console.log('Duration in Days:', durationInDays);
    console.log('Installment Duration:', installmentDuration);
    console.log('Interest Rate:', interestRate);
    console.log('Amount Payable:', amountPayable);
    console.log('Agree to Terms:', agreeTerms);
  };

  async function uploadData( formData ) {
    const uploadResponse = await lighthouse.uploadText(formData, apiKey);
    console.log(uploadResponse)
  }
  

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
          <Button type="submit" className="mt-6" fullWidth onClick={handleAccept}>
            Accept
          </Button>
        </form>
      </Card>
    </div>
  )
};

export default Form;