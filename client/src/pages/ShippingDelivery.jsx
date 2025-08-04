import React from 'react'

const ShippingDelivery = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-24">
      <h2 className="text-3xl">Shipping and Delivery Policy</h2>
      <div className="w-1/2 flex flex-col gap-4">
        <p className="text-xl">Effective Date: March 12, 2025</p>
        <p>
          We aim to deliver your products efficiently and securely.
        </p>
        <p className="text-xl">Shipping Time:</p>
        <ul>
          <li>Orders are processed within [1–3 business days].</li>
          <li>Estimated delivery: [5–10 business days], depending on your location.</li>
        </ul>
        <p className="text-xl">Shipping Charges:</p>
        <ul>
          <li> Standard shipping is [Free/Paid – specify]</li>
          <li>Express shipping available at additional cost</li>
        </ul>
          <p className="text-xl">Delivery Partners:</p>
          <p>We use reliable third-party courier services. Tracking details will be shared once your order is shipped.</p>
         <p className="text-xl">Delays:</p>
        <p>
          We are not responsible for delivery delays caused by weather, strikes, or unforeseen issues.
        </p>
      </div>
    </div>
  )
}

export default ShippingDelivery