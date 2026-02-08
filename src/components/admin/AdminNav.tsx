"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Bug, Server, Zap, Mail, Wrench } from "lucide-react";

const navItems = [
    { href: "/admin", label: "Oversikt", icon: LayoutDashboard },
    { href: "/admin/users", label: "Brukere", icon: Users },
    { href: "/admin/server", label: "Server", icon: Server },
    { href: "/admin/ai", label: "AI", icon: Zap },
    { href: "/admin/mail", label: "E-post", icon: Mail },
    { href: "/admin/bugs", label: "Bugs", icon: Bug },
    { href: "/admin/tools", label: "Verktøy", icon: Wrench },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-1 bg-cream-50 p-1 rounded-squircle-sm">
            {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-squircle-sm text-sm font-medium transition-all ${isActive
                            ? "bg-white text-charcoal shadow-sm"
                            : "text-charcoal-light hover:text-charcoal hover:bg-white/50"
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
