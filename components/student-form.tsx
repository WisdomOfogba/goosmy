"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, User, Mail, Hash, AlertCircle } from "lucide-react";
import type { StudentData } from "@/app/cos-assignment/page";
import axios from "axios";
import { useRouter } from "next/navigation";

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  onBack: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  matricNumber?: string;
}

export default function StudentForm({ onSubmit, onBack }: StudentFormProps) {
    const router = useRouter();
  const [formData, setFormData] = useState<StudentData>({
    fullName: "",
    email: "",
    matricNumber: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = "Matric number is required";
    } else if (!/^\d{9}$/i.test(formData.matricNumber.trim())) {
      newErrors.matricNumber = "Format: 9 digits, e.g. 240******";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
        const data = await axios.post('/api/paystack/init', {
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          matricNumber: formData.matricNumber.trim().toUpperCase(),
        });
        router.push(data.data.url);
      onSubmit({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        matricNumber: formData.matricNumber.trim().toUpperCase(),
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Your Details</h1>
            <p className="text-gray-600">
              We need this info to personalize your COS102 assignment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="matricNumber"
                className="block text-sm font-medium mb-2"
              >
                Matric Number
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="matricNumber"
                  value={formData.matricNumber}
                  onChange={(e) =>
                    handleInputChange("matricNumber", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.matricNumber ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="240******"
                />
              </div>
              {errors.matricNumber && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.matricNumber}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your info is only used to personalize your assignment. We don&apos;t
            spam or share your details.
          </p>
        </div>
      </div>
    </div>
  );
}
