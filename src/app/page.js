"use client";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Prototype Project by siddhant Vij and Niloy
        <ul>
          <li>
            <Link href="/type1" className="text-blue-500 hover:underline">
              Type 1
            </Link>
          </li>
          <li>
            <Link href="/type2" className="text-blue-500 hover:underline">
              Type 2
            </Link>
          </li>
          <li>
            <Link href="/type3" className="text-blue-500 hover:underline">
              Type 3
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
