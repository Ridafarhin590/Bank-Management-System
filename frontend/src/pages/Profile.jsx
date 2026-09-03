import {
  ArrowLeft,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="profile-page">

      {/* Header */}
      <header className="profile-header">

        <Link to="/dashboard" className="profile-back">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <Link to="/" className="profile-brand">
          <div className="brand-icon">
            <CreditCard size={20} />
          </div>

          <span className="brand-name">
            BankFlow
          </span>
        </Link>

      </header>

      {/* Main */}
      <main className="profile-main">

        <div className="profile-container">

          {/* Page Heading */}
          <div className="profile-heading">

            <span className="account-label">
              PERSONAL INFORMATION
            </span>

            <h1>
              Your profile.
            </h1>

            <p>
              View your personal information and account details.
            </p>

          </div>

          {/* Profile Overview */}
          <section className="profile-card profile-overview">

            <div className="profile-avatar">
              <User size={34} />
            </div>

            <div className="profile-overview-info">

              <span className="profile-small-label">
                ACCOUNT HOLDER
              </span>

              <h2>
                Customer
              </h2>

              <p>
                BankFlow Customer
              </p>

            </div>

            <div className="profile-status">
              <BadgeCheck size={16} />
              Active Account
            </div>

          </section>

          {/* Personal Information */}
          <section className="profile-card">

            <div className="profile-card-heading">

              <div className="profile-heading-icon">
                <User size={19} />
              </div>

              <div>
                <h2>
                  Personal information
                </h2>

                <p>
                  Your registered personal details
                </p>
              </div>

            </div>

            <div className="profile-details-grid">

              {/* Full Name */}
              <div className="profile-detail">

                <div className="profile-detail-icon">
                  <User size={17} />
                </div>

                <div>
                  <span>FULL NAME</span>
                  <strong>Customer</strong>
                </div>

              </div>

              {/* Email */}
              <div className="profile-detail">

                <div className="profile-detail-icon">
                  <Mail size={17} />
                </div>

                <div>
                  <span>EMAIL ADDRESS</span>
                  <strong>customer@example.com</strong>
                </div>

              </div>

              {/* Phone */}
              <div className="profile-detail">

                <div className="profile-detail-icon">
                  <Phone size={17} />
                </div>

                <div>
                  <span>PHONE NUMBER</span>
                  <strong>+91 XXXXX XXXXX</strong>
                </div>

              </div>

              {/* Address */}
              <div className="profile-detail">

                <div className="profile-detail-icon">
                  <MapPin size={17} />
                </div>

                <div>
                  <span>ADDRESS</span>
                  <strong>Your registered address</strong>
                </div>

              </div>

            </div>

          </section>

          {/* Banking Information */}
          <section className="profile-card">

            <div className="profile-card-heading">

              <div className="profile-heading-icon">
                <CreditCard size={19} />
              </div>

              <div>
                <h2>
                  Banking information
                </h2>

                <p>
                  Details about your BankFlow account
                </p>
              </div>

            </div>

            <div className="profile-bank-grid">

              <div className="profile-bank-item">
                <span>ACCOUNT NUMBER</span>
                <strong>•••• •••• 4821</strong>
              </div>

              <div className="profile-bank-item">
                <span>ACCOUNT TYPE</span>
                <strong>Savings Account</strong>
              </div>

              <div className="profile-bank-item">
                <span>ACCOUNT STATUS</span>
                <strong className="profile-active">
                  ● Active
                </strong>
              </div>

              <div className="profile-bank-item">
                <span>CURRENCY</span>
                <strong>INR (₹)</strong>
              </div>

            </div>

          </section>

          {/* Security */}
          <section className="profile-security">

            <div className="profile-security-icon">
              <ShieldCheck size={22} />
            </div>

            <div>

              <strong>
                Your account is protected
              </strong>

              <span>
                BankFlow uses secure authentication to protect
                your account and transactions.
              </span>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Profile;