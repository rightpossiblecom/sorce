import AppPreview from "./AppPreview";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-endorsements">
          <span className="yc-badge">
            <span>Backed by</span>
            <img
              src="/homepage-redesign/yc-logo.png"
              width="28"
              height="28"
              alt="Y Combinator"
            />
            <strong>Combinator</strong>
          </span>

          <p className="review-proof" aria-label="25k+ 5-star reviews">
            <span className="review-avatars" aria-hidden="true">
              <img
                className="review-avatar"
                src="/homepage-redesign/review-person-1.jpg"
                width="32"
                height="32"
                alt=""
              />
              <img
                className="review-avatar"
                src="/homepage-redesign/review-person-2.jpg"
                width="32"
                height="32"
                alt=""
              />
              <img
                className="review-avatar"
                src="/homepage-redesign/review-person-3.jpg"
                width="32"
                height="32"
                alt=""
              />
              <img
                className="review-avatar"
                src="/homepage-redesign/review-person-4.jpg"
                width="32"
                height="32"
                alt=""
              />
            </span>
            <span className="review-copy">
              <span className="review-emoji-stars" aria-hidden="true">
                ⭐️⭐️⭐️⭐️⭐️
              </span>
              <span className="review-count">25k+ 5-star reviews</span>
            </span>
          </p>
        </div>

        <h1>
          One swipe.
          <br />
          One application.
          <br />
          <span className="headline-highlight">No more forms.</span>
        </h1>

        <p className="hero-description">
          Swipe on jobs you like. Our AI will apply for you.
        </p>

        <a
          className="hero-app-store plain-download"
          aria-label="Download Sorce on the App Store"
          href="https://apps.apple.com/app/id6504584959"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>

      <AppPreview />
    </section>
  );
}
