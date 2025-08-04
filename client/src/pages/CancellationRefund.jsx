import React from 'react'

const CancellationRefund = () => {
  return (
   <div className="flex flex-col items-center gap-8 py-24">
      <h2 className="text-3xl">Cancellation and Refund Policy</h2>
      <div className="w-1/2 flex flex-col gap-4">
        <p className="text-xl">Effective Date: March 12, 2025</p>
        <p>
          We want you to be satisfied with your purchase.
        </p>
        <p className="text-xl">Cancellations:</p>
        <ul>
          <li>Orders can be cancelled within 24 hours of placement.</li>
          <li> Once shipped/delivered, cancellations are not permitted.</li>
        </ul>
        <p className="text-xl"> Refunds:</p>
        <ul>
          <li> Refunds are only applicable for damaged, defective, or wrongly delivered products.</li>
          <li>To request a refund, contact us within [X] days of receiving your item.</li>
          <li>Refunds will be processed to the original payment method within 7–10 business days.</li>
        </ul>
         <p className="text-xl">Contact Us: </p>
        <p>
          For issues, email us at khushi.johri01@gmail.com with your order number and reason. 
        </p>
      </div>
    </div>
  )
}

export default CancellationRefund