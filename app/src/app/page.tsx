// import Image from "next/image";
"use client";
import { WeeklySchedule } from "@/src/components/WeeklySchedule";
import { Heading, Section, Text } from "@radix-ui/themes";
import { UserProfile } from "../components/UserProfile";

export default function Home() {
  const date = new Date();
  return (
    <>
      {/* <main className="flex min-h-screen items-center justify-between lg:p-10"> */}
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            By{" "}Stefanel
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> 
        </div>
      </div> */}
      {/* <Container> */}

      <Section size="1" />
      <Heading className="text-center" size="6">
        <Text color="cyan">{date.getHours() > 12 ? "✨ Καλήν σας εσπέρα ✨" : "🌸 Καλήν σας ημέρα 🌸"}</Text>
        {/* <Text>Στέφανε!</Text> */}
      </Heading>
      <Section size="1" />

      <UserProfile />

      <Section size="1" />

      <WeeklySchedule />
      {/* </Container> */}

      {/* <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
      </div> */}
      {/* </main> */}
    </>
  );
}
