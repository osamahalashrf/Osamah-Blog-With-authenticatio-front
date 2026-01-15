// components/header/MobileMenuPortal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileMenuPortalProps {
    children: React.ReactNode;
}

export default function MobileMenuPortal({ children }: MobileMenuPortalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const portalRoot = document.getElementById("mobile-menu-root");
    if (!portalRoot) {
        // إنشاء عنصر إذا لم يكن موجوداً
        const div = document.createElement("div");
        div.id = "mobile-menu-root";
        document.body.appendChild(div);
        return createPortal(children, div);
    }

    return createPortal(children, portalRoot);
}