"use client";

import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, House } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import FontToggle from "./FontToggle";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = () => {
        setIsOpen(false);
    };

    return (
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger onClick={() => setIsOpen(true)}>
                    <AlignJustify />
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/" onClick={closeSheet}>
                        <House className="text-red-500" />
                    </Link>
                    <nav className="flex flex-col gap-3 lg:gap-4 mt-6 items-start pl-0">
                        <Link href="/play/1" onClick={closeSheet}>
                            Play
                        </Link>
                        <Link href="/play" onClick={closeSheet}>
                            Prompts
                        </Link>
                        <Link href="/aboutus" onClick={closeSheet}>
                            About Us
                        </Link>
                        <div onClick={closeSheet}>
                            <FontToggle/>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
