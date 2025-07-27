
import { useEffect, useState } from "react";
import LandingPage from "@/components/landing-page";
import StudentForm from "@/components/student-form";
import VerificationPage from "@/components/verification-page";
import SuccessPage from "@/components/success-page";
import SearchPage from "@/components/search-page";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";

export interface StudentData {
  fullName: string;
  email: string;
  matricNumber: string;
  department: string; 
}

export interface AssignmentData {
  id: string;
  studentData: StudentData;
  createdAt: string;
  assignmentType: "COS102";
  downloadUrl: string;
}


export function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")!;
  const matric = searchParams.get("matric")!;
  const email = searchParams.get("email")!;
  const department = searchParams.get("department")!;
  const trx_ref = searchParams.get("trxref")!;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<
    | "landing"
    | "form"
    | "payment"
    | "verification"
    | "success"
    | "search"
    | "loading"
    | "failed"
  >("landing");
  const [studentData, setStudentData] = useState<StudentData>({
    fullName: "",
    email: "",
    matricNumber: "",
    department: "",
  });
  const [assignmentData, setAssignmentData] = useState<AssignmentData | null>(
    null
  );

  useEffect(() => {
    if (name && matric && email) {
      setStudentData({
        fullName: name,
        email: email,
        matricNumber: matric,
        department: department,
      });
    }
    if (trx_ref) {
      setCurrentStep("verification");
    }
  }, [name, matric, email, department, trx_ref]);

  const handleGetStarted = () => setCurrentStep("form");
  const handleSearchAssignment = () => setCurrentStep("search");
  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data);
  };

  const handleVerificationComplete = async () => {
    try {
      setCurrentStep("loading");
      const response = await axios.post("/api/generate", {
        fullName: studentData.fullName,
        matricNumber: studentData.matricNumber,
        email: studentData.email,
        department: studentData.department,
        trx_ref,
      });
      console.log("Assignment generated:", response.data);
      setAssignmentData({
        id: response.data.assignmentId,
        studentData,
        createdAt: new Date().toISOString(),
        assignmentType: "COS102",
        downloadUrl: response.data.pdfUrl,
      });
      setCurrentStep("success");
    } catch (error) {
      setCurrentStep("failed");
      console.error("Error during verification:", error);
    }
  };

  const handleBackToLanding = async () => {
    router.push("/");
  };

  return (
    <>
      {currentStep === "landing" && (
        <LandingPage
          onGetStarted={handleGetStarted}
          onSearchAssignment={handleSearchAssignment}
        />
      )}
      {currentStep === "form" && (
        <StudentForm
          onSubmit={handleFormSubmit}
          onBack={() => setCurrentStep("landing")}
        />
      )}

      {currentStep === "verification" && (
        <VerificationPage
          trx_ref={trx_ref}
          onVerificationComplete={handleVerificationComplete}
        />
      )}
      {currentStep === "success" && assignmentData && (
        <SuccessPage
          assignmentData={assignmentData}
          onBackToHome={handleBackToLanding}
        />
      )}
      {currentStep === "search" && (
        <SearchPage onBack={() => setCurrentStep("landing")} />
      )}
      {currentStep === "failed" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">
                Generating Failed
              </h2>
              <p className="text-gray-600 mb-4">
                Please try again or contact support.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}
      {currentStep === "loading" && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-xl font-bold mb-2">Generating Pdf</h2>
                <p className="text-gray-600 mb-4">
                  Please wait while it&apos;s generating...
                </p>
                <p className="text-sm text-gray-500">
                  This usually takes a few seconds
                </p>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
