import { NextRequest, NextResponse } from "next/server";
import { getActiveSchedule, setActiveSchedule } from "../../db/redisRequests";

export const GET = async (req: NextRequest) => {
  const schedule = await getActiveSchedule();
  return NextResponse.json({ schedule }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const { schedule } = await req.json();
  if (!schedule)
    return NextResponse.json({ message: "Missing schedule " }, { status: 422 });
  await setActiveSchedule(schedule);
  return NextResponse.json({ message: "Schedule set" }, { status: 200 });
};
