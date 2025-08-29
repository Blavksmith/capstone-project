import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const pickupPrompt = `You are a cool, witty, and playful person. 
Generate a short pickup line (1-2 sentences) that is funny, smooth, natural, 
and not cringe. The pickup line must include the word: "${prompt}". 
Make sure it feels like real Gen Z slang in English, casual and relatable also no emoticon in pickup lines.`;

    const predictionRes = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: `${process.env.REPLICATE_MODEL}:${process.env.REPLICATE_MODEL_VERSION}`,
          input: { prompt: pickupPrompt },
        }),
      }
    );

    let prediction = await predictionRes.json();

    // Step 2: Poll until status = succeeded / failed
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // tunggu 2 detik
      const res = await fetch(prediction.urls.get, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });
      prediction = await res.json();
    }

    if (prediction.status === "succeeded") {
      return NextResponse.json({ output: prediction.output.join("") });
    } else {
      return NextResponse.json(
        { error: "Model failed to generate" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
