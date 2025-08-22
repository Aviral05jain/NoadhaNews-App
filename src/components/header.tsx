
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/app-logo';
import * as React from 'react';

type HeaderProps = {
    children?: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
            {children}
            <Link href="/">
                <AppLogo />
            </Link>
        </div>
        <div className="flex items-center gap-2">
            <Link href="/login">
                <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
                <Button>Sign Up</Button>
            </Link>
        </div>
    </header>
  );
}
