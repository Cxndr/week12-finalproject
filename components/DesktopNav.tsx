import { House } from "lucide-react";
import Link from "next/link";

export default function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/">
        <House className="text-red-500" />
      </Link>
      <nav className="flex items-center gap-3 lg:gap-4 ml-8">
        <Link href="/post-test">Prompt 1</Link>
        <Link href="/prompt2">Prompt 2</Link>
        <Link href="/prompt3">Prompt 3</Link>
        <Link href="/AboutUs">About Us</Link>
      </nav>
    </div>
  );
}