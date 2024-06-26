import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import GoogleButton from "@/components/buttons/GoogleButton";
import LoginButton from "@/components/buttons/LoginButton";
import LogoutButton from "@/components/buttons/LogoutButton";

export default async function Home() {
  const session = (await getServerSession()) || {};

  if (Object.keys(session).length !== 0) {
    redirect("/protected");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-8 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex">
        <div className="flex h-48 w-full items-center justify-between bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/images/icons/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
          <div className="px-2"></div>
          {Object.keys(session).length === 0 ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 lg:mb-0">
        NextJs 13 App Router and Next Auth
      </h1>

      <div className="relative mb-8 flex place-items-center lg:my-0">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/images/icons/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-1 md:gap-x-6">
        <GoogleButton />
      </div>
     
    </main>
  );
}
