import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center gap-8 my-24 h-screen">
      <h2 className="text-3xl">Privacy Policy</h2>
      <div className="w-1/2 flex flex-col gap-4">
        <p className="text-xl">Effective Date: March 12, 2025</p>
        <p>
          At Star Tribe, we value your privacy. This Privacy Policy explains how
          we collect, use, and protect your personal information when you use
          our website.
        </p>
        <p className="text-xl">What We Collect:</p>
        <ul>
          <li> Name, email address, contact information</li>
          <li> Payment details (secured and encrypted)</li>
          <li>Usage data via cookies and analytics tools</li>
        </ul>
        <p className="text-xl"> Why We Collect It:</p>
        <ul>
          <li> To process your orders</li>
          <li> To personalize your experience</li>
          <li>To improve our services</li>
        </ul>
        <p className="text-xl"> Your Data Is Safe:</p>
        <p>
          We do not sell or share your data with third parties, except where
          legally required or to process your orders securely.
        </p>
        <p className="text-xl"> Cookies: </p>
        <p>
          Our site uses cookies for a better user experience. You can
          choose to disable cookies in your browser.
        </p>

         <p className="text-xl">Contact Us: </p>
        <p>
           If you have any concerns, email us at
          khushi.johri01@gmail.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
