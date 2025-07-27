"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

interface VerificationPageProps {
  onVerificationComplete: () => Promise<void>;
  trx_ref: string;
}

export default function VerificationPage({
  onVerificationComplete,
  trx_ref,
}: VerificationPageProps) {
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );

  const verifyPayment = async (trx_ref: string) => {
    try {
      const response = await axios.post("/api/paystack/verify", { trx_ref });
      console.log("Payment verification response:", response.data);
      setStatus("success");
      await onVerificationComplete();
    } catch (error) {
      console.error("Payment verification failed:", error);
      setStatus("failed");
    }
  };

  useEffect(() => {
    verifyPayment(trx_ref);
  }, [trx_ref]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          {status === "verifying" && (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-xl font-bold mb-2">Confirming Payment</h2>
              <p className="text-gray-600 mb-4">
                Please wait while we verify your payment...
              </p>
              <p className="text-sm text-gray-500">
                This usually takes a few seconds
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Payment Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Generating your COS102 assignment now...
              </p>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Payment Verification Failed</h2>
              <p className="text-gray-600 mb-4">
                Please try again or contact support.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
