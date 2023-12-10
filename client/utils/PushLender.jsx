import React from 'react'

// userAlice.channel.create({options})
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

const userLender = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

const response = await userLender.channel.create({
    name: "Test Channel",
    description: "Test Description",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
    url: "https://push.org",
  });

const PushLender = () => {
  return (
    <div>PushLender</div>
  )
}

export default PushLender