"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المميزات", href: "#features" },
    { name: "عن المنصة", href: "#about" },
    { name: "الأسعار", href: "#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
            <Image
              src="/logo.svg"
              alt="شعار منصة الامتثال الذكي"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-primary">
            منصة الامتثال الذكي
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-light rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            ابدأ مجاناً
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-gray-100 py-6 px-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-50" />
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full py-3 text-center font-medium text-primary border border-primary/20 rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="w-full py-3 text-center font-bold text-white bg-primary rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
