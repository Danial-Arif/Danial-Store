import connectDB from "../../../../DB/route";
import User from "../../../../Schema/Accounts/route";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectDB();

  try {
    const { name, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User saved successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ message: "There was an error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
