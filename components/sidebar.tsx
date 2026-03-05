'use client';
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-blue-900 p-4 flex items-center justify-between z-20">
        <h1 className="text-xl font-bold text-white">Table Manager</h1>
        <button onClick={() => setOpen(true)} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed sm:relative top-0 left-0 h-full bg-blue-900 shadow-md p-6 flex flex-col
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          w-64 z-30
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setOpen(false)}
          className="sm:hidden text-white mb-6 self-end text-2xl font-bold"
        >
          ×
        </button>

        <h1 className="text-xl font-bold mb-6 text-white sm:block hidden">
          Table Manager
        </h1>

        <nav className="flex flex-col gap-3">
          <Link href="/" className="text-white hover:text-blue-300">
            Dashboard
          </Link>
          <Link href="/products" className="text-white hover:text-blue-300">
            Products
          </Link>
          <Link href="/structures" className="text-white hover:text-blue-300">
            Structures
          </Link>
          <Link href="/tables" className="text-white hover:text-blue-300">
            Tables
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}