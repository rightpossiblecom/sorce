import Link from "next/link";

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-top">
        <div className="landing-footer-brand">
          <Link href="/" aria-label="Sorce home" className="landing-footer-logo">
            <img
              src="/homepage-redesign/sorce-logo.svg"
              width="146"
              height="42"
              alt="Sorce"
            />
          </Link>
          <p>Download Sorce</p>
          <a
            className="landing-footer-download plain-download"
            aria-label="Download Sorce on the App Store"
            href="https://apps.apple.com/app/id6504584959"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>

        <nav className="landing-footer-column" aria-label="Legal">
          <h2>Legal</h2>
          <a href="https://www.sorce.jobs/docs/privacy-policy">Privacy Policy</a>
          <a href="https://www.sorce.jobs/docs/terms-and-conditions">Terms of Use</a>
          <a href="https://www.sorce.jobs/security">Security</a>
        </nav>

        <nav className="landing-footer-column" aria-label="Company">
          <h2>Company</h2>
          <a href="https://www.sorce.jobs/articles/sorce-faq">FAQ</a>
          <a href="mailto:founders@sorce.jobs">Contact</a>
          <a href="https://www.sorce.jobs/employer">For Employers</a>
          <a href="https://www.sorce.jobs/blog">Blog</a>
          <a href="https://www.sorce.jobs/docs/case-studies">Case Studies</a>
        </nav>
      </div>

      <div className="landing-footer-bottom">
        <p>© 2026 Sorce. All rights reserved.</p>

        <nav className="landing-footer-socials" aria-label="Sorce social media">
          <a href="https://instagram.com/sorcejobs" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/homepage-redesign/social/instagram-color.svg" width="24" height="24" alt="Instagram" />
          </a>
          <a href="https://linkedin.com/company/sorcejobs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/homepage-redesign/social/linkedin-icon.svg" width="24" height="24" alt="LinkedIn" />
          </a>
          <a href="https://x.com/sorcejobs" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <img src="/homepage-redesign/social/x.svg" width="24" height="24" alt="X" />
          </a>
          <a href="https://tiktok.com/@sorcejobs" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <img src="/homepage-redesign/social/tiktok-icon.svg" width="24" height="24" alt="TikTok" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
