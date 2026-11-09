"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface NavLink {
  readonly label: string;
  readonly href: string;
}

const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shouldRestoreFocusRef = useRef(true);

  const closeMenu = useCallback((restoreFocus: boolean = true) => {
    shouldRestoreFocusRef.current = restoreFocus !== false;
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    } else {
      setIsOpen(false);
      if (shouldRestoreFocusRef.current && window.innerWidth < 768) {
        toggleButtonRef.current?.focus();
      }
    }
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu(true);
    } else {
      openMenu();
    }
  };

  // Synchronize modal state with dialog.showModal() / dialog.close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      // Move focus into the dialog on open
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle dialog native close (e.g. Escape key)
  const handleDialogClose = useCallback(() => {
    setIsOpen(false);
    if (shouldRestoreFocusRef.current && window.innerWidth < 768) {
      toggleButtonRef.current?.focus();
    }
    shouldRestoreFocusRef.current = true;
  }, []);

  // Close on backdrop click
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeMenu(true);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on viewport resize to desktop width (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeMenu]);

  return (
    <div className="md:hidden">
      {/* Menu Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={toggleMenu}
        className="min-h-[44px] min-w-[44px] p-2 inline-flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-sm focus-visible:outline-2 focus-visible:outline-[#ff3b2f] transition-colors"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Native Modal Dialog for Mobile Navigation */}
      <dialog
        ref={dialogRef}
        id="mobile-nav-menu"
        aria-label="Mobile navigation"
        onClick={handleDialogClick}
        onClose={handleDialogClose}
        className="fixed inset-0 z-50 m-0 p-0 w-full max-w-none h-full max-h-none border-0 bg-transparent backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden"
      >
        <div
          className="fixed inset-x-0 top-16 bottom-0 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 flex flex-col justify-between p-6 overflow-y-auto text-zinc-100"
          onClick={(e) => e.stopPropagation()}
        >
          <nav aria-label="Mobile navigation" className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => closeMenu(true)}
                className="min-h-[44px] flex items-center px-4 py-3 font-mono text-sm uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-sm transition-colors border-b border-zinc-900 focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeMenu(true)}
                className="min-h-[44px] w-full flex items-center justify-center px-4 py-3 font-mono text-xs uppercase tracking-widest text-zinc-950 bg-zinc-100 font-bold hover:bg-white rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
                aria-label="Download Fatima Safwa's Resume as PDF (opens in a new tab)"
              >
                Download Resume (PDF)
              </a>
            </div>
          </nav>

          {/* Mobile Footer note */}
          <div className="pt-6 border-t border-zinc-800/80 text-center">
            <p className="font-mono text-xs text-zinc-500">
              Fatima Safwa · Developer Portfolio
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
