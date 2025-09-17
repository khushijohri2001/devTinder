import React from "react";

const TermsConditions = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-24 h-screen">
      <h2 className="text-3xl">Terms and Conditions</h2>
      <div className="w-1/2 flex flex-col gap-4">
        <p className="text-xl">Effective Date: March 12, 2025</p>
        <p>
          Welcome to Star Tribe. By using our website, you agree to the
          following terms:
        </p>

        <p className="text-xl"> 1. Use of Website</p>
        <p>
          You agree to use this website legally and respectfully. Any misuse or
          unauthorized access may lead to legal action.
        </p>
        <p className="text-xl"> 2. Intellectual Property</p>
        <p>
          All content, images, and designs are the property of [Your Brand Name]
          and may not be reused without permission.
        </p>
        <p className="text-xl"> 3. User Accounts</p>
        <p>
          You are responsible for maintaining the confidentiality of your
          account. We reserve the right to terminate accounts that violate our
          terms.
        </p>
        <p className="text-xl"> 4. Purchases</p>
        <p>
          All products/services are subject to availability and price changes.
          We reserve the right to refuse service at our discretion.
        </p>
        <p className="text-xl"> 5. Liability</p>
        <p>
          We are not liable for any damages resulting from the use or inability
          to use our services.
        </p>
        <p className="text-xl">6. Changes to Terms</p>
        <p>
          We may update these terms at any time. Continued use of the site means
          you accept the updated terms.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
