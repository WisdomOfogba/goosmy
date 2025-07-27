import dbConnect from "@/lib/mongo";
import Assignment from "@/models/Assignment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assignmentId = searchParams.get("assignmentId");

  try {
        await dbConnect();
    const assignment = await Assignment.findOne({ assignmentId });
    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    console.log("Assignment found:", assignment);

    return NextResponse.json({
      assignmentId: assignment.assignmentId,
      fullName: assignment.fullName,
      matricNumber: assignment.matricNumber,
      downloadUrl: assignment.pdfUrl,
      createdAt: assignment.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
