"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Shield } from "lucide-react"
import type { StudentData } from "@/app/cos-assignment/page"

interface PaymentPageProps {
  studentData: StudentData
  onPayment: () => void
  onBack: () => void
}

export default function PaymentPage({ studentData, onPayment, onBack }: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onPayment()
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pay for Your COS102 Assignment</h1>
            <p className="text-gray-600">Secure payment via Paystack</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-medium mb-4">Order Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-medium">{studentData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Matric:</span>
                <span className="font-medium">{studentData.matricNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Assignment:</span>
                <span className="font-medium">COS102 Complete Solution</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">₦1,500</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>All Cards Accepted</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              "Pay ₦1,500 with Paystack"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            You&apos;ll receive your COS102 assignment within 10 minutes after payment.
          </p>
        </div>
      </div>
    </div>
  )
}
