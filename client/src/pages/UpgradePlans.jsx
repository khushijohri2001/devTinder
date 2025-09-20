import React, { useEffect, useState } from "react";
import { checkSvg } from "../assets/svgs";
import { BASE_URL } from "../redux/constants";
import axios from "axios";

const UpgradePlans = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    handleVerifyPremium();
  }, []);

  const handleVerifyPremium = async () => {
    try {
     const response = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (response.data.isPremium) {
      setIsUserPremium(true);
    }
    
   } catch (error) {
    console.error(error.message)
   }
  }

  const handleBuyNow = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { keyId, amount, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Star Tribe",
      description: "Meet your mystical friend",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
      },
      theme: {
        color: "#F37254",
      },
      handler: handleVerifyPremium,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  return isUserPremium ? (
    <p>You're already a Premium User</p>
  ) : (
    <div className="py-10 flex flex-col items-center gap-8 h-screen">
      <h2 className="text-3xl font-bold">Upgrade Plans</h2>

      <div className="stats mx-auto">
        <div className="border-base-300 border rounded-2xl w-[340px]">
          {/* Upper */}
          <div className="stat not-last:border-0 w-full">
            <div className="text-2xl">Monthly Plan</div>
            <div className="stat-title">
              Unlock amazing features for each month
            </div>
            <div className="stat-value mt-8">
              <span className="text-xl">₹</span>200
            </div>
            <div className="stat-title">/ month</div>
            <div className="stat-actions">
              <button
                className="btn btn-sm btn-secondary w-full mt-4"
                onClick={() => handleBuyNow("monthly")}
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="divider"></div>
          {/* Bottom */}
          <div className="stat">
            <div className="text-xl">Features</div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                {checkSvg}
                <span>High-resolution image generation</span>
              </li>
              <li>
                {checkSvg}
                <span>Customizable style templates</span>
              </li>
              <li>
                {checkSvg}
                <span>Batch processing capabilities</span>
              </li>
              <li>
                {checkSvg}
                <span>AI-driven image enhancements</span>
              </li>
              <li className="opacity-50">
                {checkSvg}
                <span className="line-through">Seamless cloud integration</span>
              </li>
              <li className="opacity-50">
                {checkSvg}
                <span className="line-through">
                  Real-time collaboration tools
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-base-300 border rounded-2xl ml-4 w-[340px]">
          {/* Upper */}
          <div className="stat not-last:border-0">
            <div className="text-2xl">Lifetime Access</div>
            <div className="stat-title">
              Pay once and Unlock amazing features forever
            </div>
            <div className="stat-value mt-8">
              <span className="text-xl">₹</span>10,000
            </div>
            <div className="stat-title">one-time</div>
            <div className="stat-actions">
              <button
                className="btn btn-sm btn-secondary w-full mt-4"
                onClick={() => handleBuyNow("oneTime")}
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="divider"></div>
          {/* Bottom */}
          <div className="stat">
            <div className="text-xl">Features</div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                {checkSvg}
                <span>High-resolution image generation</span>
              </li>
              <li>
                {checkSvg}
                <span>Customizable style templates</span>
              </li>
              <li>
                {checkSvg}
                <span>Batch processing capabilities</span>
              </li>
              <li>
                {checkSvg}
                <span>AI-driven image enhancements</span>
              </li>
              <li className="opacity-50">
                {checkSvg}
                <span className="line-through">Seamless cloud integration</span>
              </li>
              <li className="opacity-50">
                {checkSvg}
                <span className="line-through">
                  Real-time collaboration tools
                </span>
              </li>
            </ul>
          </div>
          ̦
        </div>
      </div>
    </div>
  );

};

export default UpgradePlans;
