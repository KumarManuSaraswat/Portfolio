export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8 md:px-10"
    >
      <div
        className="w-full max-w-6xl"
        style={{
          textShadow: '0 2px 18px rgba(0, 0, 0, 0.18)',
        }}
      >
        <div className="max-w-[680px] rounded-[30px] border border-white/20 bg-black/25 p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-8 md:p-10">
          <p className="max-w-xl text-base font-medium leading-7 text-white/90 sm:text-lg">
            Hi, I’m Kumar Manu Saraswat.
            <br />
            Full-stack developer in progress, creative builder by nature.
          </p>

          <h1 className="mt-6 max-w-2xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            I build practical web products with clean code and visual detail.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
            I work with React, JavaScript, Node.js, APIs, authentication, and
            responsive interfaces. I also enjoy Blender 3D animation, digital
            design, and turning ideas into memorable experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-1"
            >
              View my work
            </a>

            <a
              href="#process"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-black"
            >
              My process
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-black"
            >
              Let’s talk
            </a>
          </div>

          <div className="mt-4">
            <a
              href="mailto:kumarsaraswat1983@gmail.com"
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/35 bg-black/20 px-4 py-2.5 text-sm text-white/95 backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-black"
            >
              <span className="truncate">
                Reach me: kumarsaraswat1983@gmail.com
              </span>

              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}