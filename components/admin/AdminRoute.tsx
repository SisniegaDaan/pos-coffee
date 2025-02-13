"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({ link }: AdminRouteProps) {
  const path = usePathname();
  const isActive = path.startsWith(link.url);

  return (
    <Link
      className={`${ isActive ? "bg-[#a4854e] text-white" : "hover:bg-gray-100" } over:bg-slate-300
      flex items-center gap-10 w-100 p-3 border-gray-200 border-t last-of-type:border-b font-semibold cursor-pointer`}
      href={link.url}
      target={link.blank ? '_blanck' : ''}
    >
      {link.text}
    </Link>
  );
}
