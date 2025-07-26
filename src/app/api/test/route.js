import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    console.log("🔥 API Route Hit");

    const client = await clientPromise;
    console.log("✅ Connected to MongoDB");

    const db = client.db("vetpharma"); // Use the DB name you want
    const result = await db
      .collection("test")
      .insertOne({ message: "Hello from API!" });

    console.log("📥 Inserted doc:", result.insertedId);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    return Response.json(
      { success: false, message: "MongoDB connection failed" },
      { status: 500 }
    );
  }
}
