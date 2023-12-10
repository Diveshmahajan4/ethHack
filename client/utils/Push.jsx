import React from 'react'

// // Expected notification from account 1 to divesh
// // Creating a channel using my private Id 

// import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

// // Creating Borrowers Account/Channel
// const signer = 'eeea3c150ed79a94721046a32cc48cb52e6649dae4ced90595731c40e4844ec1'

// const userBorrower = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

// // Creating a channel for Borrower
// const response = await userBorrower.channel.create({
//     name: "Test Channel",
//     description: "Test Description",
//     icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
//     url: "https://push.org",
//   });
//   console.log(response)

//   const createChannelSettingRes = userBorrower.channel.setting([
//     { 
  
//       type: 1, // Boolean type
//       default: 1,
//       description: "Receive marketing notifications",
//     },
//     {
//       type: 2, // Slider type
//       default: 10,
//       description: "Notify when loan health breaches",
//       data: { upper: 100, lower: 5, ticker: 1 },
//     },
//   ]);
//   console.log('Channel Settings: ' , createChannelSettingRes)

//   // Subscribing to this channel to  get notifications
//   // Typically Lender will Subscribe
//   const subBorrower = await userBorrower.notification.subscribe(
//     `eip155:11155111:0x8f7362f37102A62eA83761ae76b27CE0A9400181`,
//   );
//   console.log('Me subscribing the lender', subBorrower)


//   // Borrwer will send notifications to all the subscribers
//   const sendNotifRes = await userBorrower.channel.send(["*"], {
//     notification: { title: "test", body: "test" },
//   });

//   console.log('Notifications is Sent', sendNotifRes)

//   const handleOnClick = () => {

//   }

const Push = () => {
  return (
    <div>
        <button onClick={sendNotifRes}>
            Send Notififcation
        </button>
    </div>
  )
}

export default Push