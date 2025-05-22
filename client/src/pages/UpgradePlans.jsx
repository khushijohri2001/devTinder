import React from "react";
import { checkSvg } from "../assets/svgs";

const UpgradePlans = () => {
  return (
    <div className="py-10 flex flex-col items-center gap-8">
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
            <div className="stat-title">per month</div>
            <div className="stat-actions">
              <button className="btn btn-sm btn-secondary w-full mt-4">
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
              <button className="btn btn-sm btn-secondary w-full mt-4">
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
