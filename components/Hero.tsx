import {POCELSTO_URL} from '@/lib/config'

export default function Hero() {
  return (
    <section className="hero">
      {/* Noise overlay so the gradient does not band. */}
      <svg className="hero__noise" aria-hidden="true">
        <filter id="heroNoise">
          <feTurbulence baseFrequency="0.75" numOctaves={4} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroNoise)" />
      </svg>

      <nav className="hero__nav">
        <a href={POCELSTO_URL}>Writings</a>
        <a href="/resume">Resume</a>
        <a href="#portfolio">Projects</a>
        <a href="/contact">Contact Me</a>
      </nav>

      <div className="hero__content">
        <h1 className="hero__headline">Hello, I am Gurkirat!</h1>
        <p className="hero__sub">
          I&rsquo;m drawn to the space between industries — where market entry, business
          pivots, and product launches take shape.
        </p>
        <div className="hero__arrow">
          <a href="#portfolio" aria-label="Scroll to portfolio">
            <svg
              viewBox="0 0 30 56"
              width="30"
              height="56"
              stroke="rgba(245,240,232,0.5)"
              fill="none"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M 7 4 C 24 6, 28 30, 15 52" />
              <path d="M 22 46 L 15 52 L 13 44" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
