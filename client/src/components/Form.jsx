import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

const Form = () => {

    const expectedCollateral = ( number ) => {
        return number/2;
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
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Expected collateral you can get
          </Typography>
          <Input
            size="lg"
            placeholder={expectedCollateral}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            disabled
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Type duration in days
          </Typography>
          <Input
           type='number'
            size="lg"
            placeholder="12"
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
            placeholder="7"
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
            placeholder="7"
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
            placeholder="7"
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
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          Accept
        </Button>
      </form>
    </Card>
    </div>
    
  )
}

export default Form