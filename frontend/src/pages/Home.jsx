import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Zap,
  LockKeyhole,
  CreditCard,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="nav-container">

          <Link to="/" className="brand">

            <div className="brand-icon">
              <CreditCard size={21} />
            </div>

            <span className="brand-name">
              BankFlow
            </span>

          </Link>

          <nav className="nav-links">

            <a href="#features">
              Features
            </a>

            <a href="#security">
              Security
            </a>

            <a href="#about">
              About
            </a>

          </nav>

          <div className="nav-actions">

            <Link
              to="/login"
              className="login-button"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="nav-register-button"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </header>


      {/* HERO */}

      <main>

        <section className="hero">

          <div className="hero-container">

            <div className="hero-content">

              <div className="hero-badge">

                <span className="badge-dot"></span>

                Secure digital banking

              </div>

              <h1>

                Banking made
                <span> simple.</span>

                <br />

                Life made easier.

              </h1>

              <p className="hero-description">

                Manage your money, transfer funds, track
                transactions, and stay in control of your
                finances — all from one secure banking platform.

              </p>

              <div className="hero-buttons">

                <Link
                  to="/register"
                  className="primary-button"
                >
                  Open an Account
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#features"
                  className="secondary-button"
                >
                  Explore Features
                  <ChevronRight size={18} />
                </a>

              </div>

              <div className="hero-trust">

                <div className="trust-item">

                  <ShieldCheck size={18} />

                  <span>
                    Secure & protected
                  </span>

                </div>

                <div className="trust-item">

                  <LockKeyhole size={17} />

                  <span>
                    JWT authentication
                  </span>

                </div>

              </div>

            </div>


            {/* BANK CARD */}

            <div className="hero-visual">

              <div className="glow"></div>

              <div className="bank-card">

                <div className="card-top">

                  <div>

                    <span className="card-label">
                      TOTAL BALANCE
                    </span>

                    <div className="card-balance">
                      ₹84,520.00
                    </div>

                  </div>

                  <div className="card-logo">
                    <CreditCard size={22} />
                  </div>

                </div>

                <div className="card-middle">

                  <div className="card-number">
                    •••• •••• •••• 4821
                  </div>

                  <ArrowUpRight
                    className="card-arrow"
                    size={22}
                  />

                </div>

                <div className="card-bottom">

                  <div>

                    <span className="small-label">
                      ACCOUNT TYPE
                    </span>

                    <strong>
                      SAVINGS
                    </strong>

                  </div>

                  <div>

                    <span className="small-label">
                      STATUS
                    </span>

                    <strong className="active-status">
                      ● ACTIVE
                    </strong>

                  </div>

                </div>

              </div>


              {/* TRANSACTION */}

              <div className="floating-transaction">

                <div className="transaction-icon">
                  <ArrowUpRight size={18} />
                </div>

                <div className="transaction-info">

                  <span>
                    Recent transfer
                  </span>

                  <strong>
                    + ₹8,000
                  </strong>

                </div>

                <span className="transaction-time">
                  Just now
                </span>

              </div>


              {/* SECURITY */}

              <div className="floating-security">

                <div className="security-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>

                  <strong>
                    Protected
                  </strong>

                  <span>
                    Your account is secure
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-container">

            <div className="section-heading">

              <span className="section-label">
                EVERYTHING YOU NEED
              </span>

              <h2>
                Banking that works
                <span> for you.</span>
              </h2>

              <p>
                Powerful banking features designed to make
                managing your finances simple and convenient.
              </p>

            </div>


            <div className="features-grid">

              <Feature
                icon={<Zap size={23} />}
                title="Instant Transfers"
                text="Send money quickly and securely to another bank account whenever you need it."
              />

              <Feature
                icon={<CreditCard size={23} />}
                title="Smart Accounts"
                text="View balances, account details, and manage your banking accounts from one dashboard."
              />

              <Feature
                icon={<ShieldCheck size={23} />}
                title="Bank-Level Security"
                text="Your account is protected with secure authentication and encrypted password storage."
              />

              <Feature
                icon={<Smartphone size={23} />}
                title="Easy Management"
                text="Access your banking dashboard from desktop, tablet, or mobile devices."
              />

            </div>

          </div>

        </section>


        {/* SECURITY */}

        <section
          className="security-section"
          id="security"
        >

          <div className="security-container">

            <div className="security-content">

              <span className="section-label">
                SECURITY FIRST
              </span>

              <h2>
                Your money.
                <br />
                <span>Your security.</span>
              </h2>

              <p>
                BankFlow is designed with security at its core.
                Authentication, protected APIs, and encrypted
                passwords help keep your financial information safe.
              </p>

              <div className="security-points">

                <div>
                  <ShieldCheck size={19} />
                  Secure authentication
                </div>

                <div>
                  <LockKeyhole size={19} />
                  Encrypted passwords
                </div>

                <div>
                  <Zap size={19} />
                  Protected transactions
                </div>

              </div>

            </div>


            <div className="security-card">

              <ShieldCheck size={42} />

              <h3>
                Protected Banking
              </h3>

              <p>
                Built with modern security practices
                for safer digital banking.
              </p>

              <div className="security-status">

                <span></span>

                System secure

              </div>

            </div>

          </div>

        </section>


        {/* CTA */}

        <section
          className="cta-section"
          id="about"
        >

          <div className="cta-container">

            <div>

              <span className="section-label">
                GET STARTED TODAY
              </span>

              <h2>
                Your smarter banking
                <br />
                experience starts here.
              </h2>

            </div>

            <Link
              to="/register"
              className="primary-button"
            >
              Create Account
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-container">

          <Link to="/" className="brand">

            <div className="brand-icon">
              <CreditCard size={19} />
            </div>

            <span className="brand-name">
              BankFlow
            </span>

          </Link>

          <p>
            © 2026 BankFlow. Modern banking made simple.
          </p>

        </div>

      </footer>

    </div>
  );
}


function Feature({ icon, title, text }) {

  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <div className="feature-link">
        Learn more
        <ArrowRight size={15} />
      </div>

    </div>
  );
}


export default Home;