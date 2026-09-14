import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed left-4 right-4 top-4 z-50 flex w-auto items-center justify-between rounded-full border border-white/20 bg-black/20 px-5 py-3 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:left-6 sm:right-6 sm:top-5 sm:px-7 sm:py-3.5 md:left-8 md:right-8 md:px-8"
      >
        <a id="navbar-logo" href="#mainframe-app" onClick={closeMobileMenu} aria-label="Kumar — back to top" className="flex select-none items-center gap-3 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <span
            className="text-[22px] font-semibold tracking-tighter text-white sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Kumar
          </span>

          <span
            className="mb-1 text-[26px] leading-none text-white sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
          </span>
        </a>

        <div
          id="desktop-nav-links"
          className="hidden items-center gap-6 text-[17px] font-normal text-white md:flex"
        >
          <a
            href="#about"
            className="transition-opacity hover:opacity-60"
          >
            About
          </a>

          <a
            href="#work"
            className="transition-opacity hover:opacity-60"
          >
            Work
          </a>

          <a href="#play" className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white hover:text-black">
            Play ↗
          </a>

          <a
            href="#process"
            className="transition-opacity hover:opacity-60"
          >
            Process
          </a>

          <a
            href="#contact"
            className="transition-opacity hover:opacity-60"
          >
            Contact
          </a>
        </div>

        <div className="hidden md:block">
          <a
            id="desktop-cta-link"
            href="mailto:kumarsaraswat1983@gmail.com"
            className="text-[17px] text-white underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Connect
          </a>
        </div>

        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="z-50 flex cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full p-2 focus:outline-none md:hidden"
        >
          <span
            className={`h-[2px] w-6 origin-center bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />

          <span
            className={`h-[2px] w-6 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <span
            className={`h-[2px] w-6 origin-center bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-black/45 px-8 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <a
          href="#about"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
        >
          About
        </a>

        <a
          href="#work"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
        >
          Work
        </a>

        <a href="#play" onClick={closeMobileMenu} className="text-[32px] font-medium text-white transition-opacity hover:opacity-60">
          Play ↗
        </a>

        <a
          href="#process"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
        >
          Process
        </a>

        <a
          href="#contact"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
        >
          Contact
        </a>

        <a
          href="mailto:kumarsaraswat1983@gmail.com"
          onClick={closeMobileMenu}
          className="text-[32px] font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Connect
        </a>
      </div>
    </>
  );
}
