import { NextResponse } from "next/server";
import { SignUpSchema } from "@/components/forms/sign-up/schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"; // Import bcrypt for hashing

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = SignUpSchema.parse(body);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // Hash the passcode before storing it
    const hashedPasscode = await bcrypt.hash(validatedData.password, 10); // 10 is the salt rounds

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPasscode, // Changed from passcode to password
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Invalid data or server error", details: error }, // Include details for debugging
      { status: 400 },
    );
  }
}
