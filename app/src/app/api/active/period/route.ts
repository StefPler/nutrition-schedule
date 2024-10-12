import { NextRequest, NextResponse } from "next/server";
import { getActivePeriod, setActivePeriod } from "../../db/redisRequests";

export const GET = async (req: NextRequest) => {
  try {
    const period = await getActivePeriod();
    console.log("period date", period);
    return NextResponse.json({ period }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { date } = await req.json();
    if (!date)
      return NextResponse.json({ message: "Missing date" }, { status: 422 });
    await setActivePeriod(date);
    return NextResponse.json(
      { message: `Date "${date}" set` },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
