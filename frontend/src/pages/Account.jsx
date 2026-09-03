import {
  LayoutDashboard,
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  User,
  Settings,
  CreditCard,
  ChevronRight,
  Wallet,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

function Account() {
  return (
    <div className="account-page">

      {/* Sidebar */}
      <aside className="account-sidebar">

        {/* Brand */}
        <Link to="/" className="account-brand">
          <div className="brand-icon">
            <CreditCard size={21} />
          </div>

          <span className="brand-name">
            BankFlow
          </span>
        </Link>

        {/* Navigation */}
        <nav className="account-nav">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="account-nav-item"
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
            <ChevronRight size={16} />
          </Link>

          {/* Account */}
          <div className="account-nav-section">
            <span className="account-nav-label">
              ACCOUNT
            </span>

            <Link
              to="/account/transfer"
              className="account-nav-item"
            >
              <ArrowLeftRight size={19} />
              <span>Transfer Money</span>
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/account/deposit"
              className="account-nav-item"
            >
              <ArrowDownToLine size={19} />
              <span>Deposit</span>
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/account/withdraw"
              className="account-nav-item"
            >
              <ArrowUpFromLine size={19} />
              <span>Withdraw</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Personal */}
          <div className="account-nav-section">
            <span className="account-nav-label">
              PERSONAL
            </span>

            <Link
              to="/account/profile"
              className="account-nav-item"
            >
              <User size={19} />
              <span>Profile</span>
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/account/settings"
              className="account-nav-item"
            >
              <Settings size={19} />
              <span>Settings</span>
              <ChevronRight size={16} />
            </Link>
          </div>

        </nav>

        {/* Security */}
        <div className="account-security-box">
          <div className="account-security-icon">
            <ShieldCheck size={19} />
          </div>

          <div>
            <strong>Secure Banking</strong>
            <span>Your account is protected</span>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="account-main">

        {/* Header */}
        <div className="account-header">
          <div>
            <span className="account-label">
              MY ACCOUNT
            </span>

            <h1>
              Manage your money.
            </h1>

            <p>
              Transfer funds, deposit money, withdraw funds,
              and manage your account.
            </p>
          </div>

          <div className="account-user">
            <div className="account-user-avatar">
              <User size={20} />
            </div>

            <div>
              <strong>Customer</strong>
              <span>Personal Account</span>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <section className="account-balance-card">

          <div className="balance-card-content">

            <div className="balance-card-icon">
              <Wallet size={24} />
            </div>

            <div>
              <span>AVAILABLE BALANCE</span>

              <h2>
                ₹84,520.00
              </h2>

              <p>
                Your current account balance
              </p>
            </div>

          </div>

          <div className="balance-card-details">

            <div>
              <span>ACCOUNT TYPE</span>
              <strong>SAVINGS</strong>
            </div>

            <div>
              <span>STATUS</span>

              <strong className="account-active">
                ● ACTIVE
              </strong>
            </div>

          </div>

        </section>

        {/* Quick Actions */}
        <section className="account-actions-section">

          <div className="account-section-heading">

            <div>
              <span className="account-label">
                QUICK ACTIONS
              </span>

              <h2>
                What would you like to do?
              </h2>
            </div>

          </div>

          <div className="account-actions-grid">

            {/* Transfer */}
            <Link
              to="/account/transfer"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <ArrowLeftRight size={23} />
              </div>

              <div className="account-action-content">
                <h3>
                  Transfer Money
                </h3>

                <p>
                  Send money securely to another account.
                </p>
              </div>

              <ChevronRight size={19} />
            </Link>

            {/* Deposit */}
            <Link
              to="/account/deposit"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <ArrowDownToLine size={23} />
              </div>

              <div className="account-action-content">
                <h3>
                  Deposit
                </h3>

                <p>
                  Add money to your bank account.
                </p>
              </div>

              <ChevronRight size={19} />
            </Link>

            {/* Withdraw */}
            <Link
              to="/account/withdraw"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <ArrowUpFromLine size={23} />
              </div>

              <div className="account-action-content">
                <h3>
                  Withdraw
                </h3>

                <p>
                  Withdraw money from your account.
                </p>
              </div>

              <ChevronRight size={19} />
            </Link>

            {/* Profile */}
            <Link
              to="/account/profile"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <User size={23} />
              </div>

              <div className="account-action-content">
                <h3>
                  Profile
                </h3>

                <p>
                  View and manage your personal information.
                </p>
              </div>

              <ChevronRight size={19} />
            </Link>

          </div>

        </section>

        {/* Account Information */}
        <section className="account-info-section">

          <div className="account-section-heading">

            <span className="account-label">
              ACCOUNT INFORMATION
            </span>

            <h2>
              Your banking details
            </h2>

          </div>

          <div className="account-info-card">

            {/* Account Number */}
            <div className="account-info-row">
              <span>
                Account Number
              </span>

              <strong>
                •••• •••• 4821
              </strong>
            </div>

            {/* Account Type */}
            <div className="account-info-row">
              <span>
                Account Type
              </span>

              <strong>
                Savings Account
              </strong>
            </div>

            {/* Account Status */}
            <div className="account-info-row">
              <span>
                Account Status
              </span>

              <strong className="account-active">
                Active
              </strong>
            </div>

            {/* Currency */}
            <div className="account-info-row">
              <span>
                Currency
              </span>

              <strong>
                INR (₹)
              </strong>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Account;