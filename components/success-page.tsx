"use client";

import { useState } from "react";
import {
  CheckCircle,
  Download,
  Mail,
  FileText,
  Home,
  Copy,
  Check,
} from "lucide-react";
import type { AssignmentData } from "@/app/cos-assignment/page";

interface SuccessPageProps {
  assignmentData: AssignmentData;
  onBackToHome: () => void;
}

export default function SuccessPage({
  assignmentData,
  onBackToHome,
}: SuccessPageProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    const response = await fetch(assignmentData.downloadUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `COS102_Assignment_${assignmentData.studentData.matricNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
  };

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(assignmentData.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Your COS102 Assignment is Ready!
            </h1>
            <p className="text-gray-600">
              Assignment generated and sent to your email
            </p>
          </div>

          {/* Assignment ID */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900 mb-1">
                  Assignment ID
                </h3>
                <p className="text-blue-800 font-mono text-sm">
                  {assignmentData.id}
                </p>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <p className="text-blue-700 text-xs mt-2">
              Save this ID to download your assignment anytime
            </p>
          </div>

          {/* Email sent */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium">Sent to Your Email</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Check <strong>{assignmentData.studentData.email}</strong> (and
              spam folder)
            </p>
          </div>

          {/* Assignment preview */}
          <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium">COS102 Assignment</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600">Student:</span>
                <p className="font-medium">
                  {assignmentData.studentData.fullName}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Matric:</span>
                <p className="font-medium">
                  {assignmentData.studentData.matricNumber}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Course:</span>
                <p className="font-medium">COS102 - Computer Science</p>
              </div>
              <div>
                <span className="text-gray-600">Generated:</span>
                <p className="font-medium">
                  {new Date(assignmentData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Mock preview */}
            <iframe src={assignmentData.downloadUrl} className="bg-gray-50 rounded h-[500px] w-full p-2 border-2 border-dashed border-gray-300" />
              {/* <div className="text-center mb-3">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium">
                  COS102 Assignment Solution
                </p>
                <p className="text-xs text-gray-500">Ready for submission</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div> */}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onBackToHome}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Done</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Remember:</strong> Keep your assignment ID (
              {assignmentData.id}) safe. You can use it to download your work
              again anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
