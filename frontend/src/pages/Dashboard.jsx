import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CreditCard,
  LogOut,
  Menu,
  Plus,
  Send,
  Settings,
  User,
  WalletCards,
  X,
  MoreHorizontal,
  Download,
  Eye,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/*  SIDEBAR  */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="dashboard-logo">

          <Link to="/" className="dashboard-logo-link">
            <div className="brand-icon">
              <CreditCard size={20} />
            </div>

            <span>
              BankFlow
            </span>
          </Link>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

        </div>


        {/* NAVIGATION */}

        <nav className="dashboard-nav">

          {/* MAIN MENU */}

          <p className="nav-section-title">
            MAIN MENU
          </p>


          {/* Dashboard */}

          <Link
            to="/dashboard"
            className="dashboard-nav-item active"
            onClick={() => setSidebarOpen(false)}
          >
            <WalletCards size={18} />
            <span>Dashboard</span>
          </Link>


          {/* My Account */}

          <Link
            to="/account"
            className="dashboard-nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <CreditCard size={18} />
            <span>My Account</span>
          </Link>


          {/* Transfer Money */}

          <Link
            to="/account/transfer"
            className="dashboard-nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Send size={18} />
            <span>Transfer Money</span>
          </Link>


          {/* Deposit */}

          <Link
            to="/account/deposit"
            className="dashboard-nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Plus size={18} />
            <span>Deposit</span>
          </Link>


          {/* Withdraw */}

          <Link
            to="/account/withdraw"
            className="dashboard-nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <ArrowUpRight size={18} />
            <span>Withdraw</span>
          </Link>


          {/* ACCOUNT */}

          <p className="nav-section-title second">
            ACCOUNT
          </p>


          {/* Profile */}

          <Link
            to="/account/profile"
            className="dashboard-nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>


          {/* Settings */}

          <Link
            to="/account/settings"
            className="dashboard-nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

        </nav>


        {/* LOGOUT */}

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </aside>


      {/*  MAIN  */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div className="dashboard-header-left">

            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>


            <div>

              <h1>
                Welcome, Rida 👋
              </h1>

              <p>
                Here's what's happening with your account.
              </p>

            </div>

          </div>


          <div className="dashboard-header-actions">

            <button className="notification-button">

              <Bell size={19} />

              <span></span>

            </button>


            <div className="profile-mini">

              <div className="profile-avatar">
                RF
              </div>

              <div>

                <strong>
                  Rida Farhin
                </strong>

                <span>
                  Customer
                </span>

              </div>

            </div>

          </div>

        </header>


        {/*  STATISTICS  */}

        <section className="dashboard-stats">

          {/* BALANCE */}

          <div className="balance-card">

            <div className="balance-card-top">

              <div>

                <span>
                  TOTAL BALANCE
                </span>

                <h2>
                  ₹84,520.00
                </h2>

              </div>


              <div className="balance-icon">

                <WalletCards size={21} />

              </div>

            </div>


            <div className="balance-card-bottom">

              <span>
                Available balance
              </span>

              <strong>
                ● Active
              </strong>

            </div>

          </div>


          {/* MONEY RECEIVED */}

          <div className="stat-card">

            <div className="stat-icon green">

              <ArrowDownLeft size={19} />

            </div>

            <span>
              Money received
            </span>

            <strong>
              ₹42,850
            </strong>

            <small>
              This month
            </small>

          </div>


          {/* MONEY SPENT */}

          <div className="stat-card">

            <div className="stat-icon red">

              <ArrowUpRight size={19} />

            </div>

            <span>
              Money spent
            </span>

            <strong>
              ₹18,320
            </strong>

            <small>
              This month
            </small>

          </div>

        </section>


        {/* ================= ACCOUNT + QUICK ACTIONS ================= */}

        <section className="dashboard-content-grid">


          {/* ACCOUNT */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h3>
                  My Account
                </h3>

                <p>
                  Your primary savings account
                </p>

              </div>


              <Link
                to="/account"
                className="panel-action"
              >
                View
              </Link>

            </div>


            <div className="account-card">

              <div className="account-card-top">

                <div className="account-card-icon">

                  <CreditCard size={20} />

                </div>


                <span>
                  SAVINGS
                </span>

              </div>


              <p>
                Account Number
              </p>


              <strong className="account-number">
                •••• •••• •••• 4821
              </strong>


              <div className="account-card-footer">

                <div>

                  <span>
                    Balance
                  </span>

                  <strong>
                    ₹84,520.00
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong className="account-active">
                    ● ACTIVE
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Quick Actions
                </h3>

                <p>
                  Manage your money
                </p>

              </div>

            </div>


            <div className="quick-actions">


              {/* Transfer */}

              <Link
                to="/account/transfer"
                className="quick-action-button"
              >

                <div className="quick-icon blue">
                  <Send size={18} />
                </div>

                <span>
                  Transfer
                </span>

              </Link>


              {/* Deposit */}

              <Link
                to="/account/deposit"
                className="quick-action-button"
              >

                <div className="quick-icon green">
                  <ArrowDownLeft size={18} />
                </div>

                <span>
                  Deposit
                </span>

              </Link>


              {/* Withdraw */}

              <Link
                to="/account/withdraw"
                className="quick-action-button"
              >

                <div className="quick-icon orange">
                  <ArrowUpRight size={18} />
                </div>

                <span>
                  Withdraw
                </span>

              </Link>


              {/* Accounts */}

              <Link
                to="/account"
                className="quick-action-button"
              >

                <div className="quick-icon purple">
                  <CreditCard size={18} />
                </div>

                <span>
                  Accounts
                </span>

              </Link>

            </div>

          </div>

        </section>


        {/* ================= TRANSACTIONS ================= */}

        <section className="dashboard-panel transactions-panel">

          <div className="panel-header">

            <div>

              <h3>
                Recent Transactions
              </h3>

              <p>
                Your latest account activity
              </p>

            </div>


            <div className="transaction-actions">

              <button className="export-button">

                <Download size={14} />

                Export

              </button>


              <button className="panel-action">
                View all
              </button>

            </div>

          </div>


          <div className="transaction-list">

            <Transaction
              icon={<ArrowDownLeft size={18} />}
              title="Money received"
              subtitle="Transfer from another account"
              amount="+ ₹8,000"
              positive
              date="Today, 10:32 AM"
              status="Completed"
            />


            <Transaction
              icon={<ArrowUpRight size={18} />}
              title="Online payment"
              subtitle="Shopping transaction"
              amount="- ₹2,500"
              date="Yesterday, 4:18 PM"
              status="Completed"
            />


            <Transaction
              icon={<ArrowDownLeft size={18} />}
              title="Salary credit"
              subtitle="Monthly salary"
              amount="+ ₹35,000"
              positive
              date="Aug 30, 9:15 AM"
              status="Completed"
            />


            <Transaction
              icon={<ArrowUpRight size={18} />}
              title="Fund transfer"
              subtitle="Transfer to another account"
              amount="- ₹5,000"
              date="Aug 28, 2:45 PM"
              status="Completed"
            />

          </div>

        </section>


        {/* ================= SECURITY BANNER ================= */}

        <section className="dashboard-security-banner">

          <div className="dashboard-security-icon">

            <Eye size={20} />

          </div>


          <div>

            <strong>
              Your account is protected
            </strong>

            <p>
              BankFlow uses secure authentication to protect
              your account and transactions.
            </p>

          </div>


          <span className="security-banner-status">
            Secure
          </span>

        </section>

      </main>

    </div>
  );
}


/* TRANSACTION COMPONENT */

function Transaction({
  icon,
  title,
  subtitle,
  amount,
  positive,
  date,
  status,
}) {

  return (

    <div className="transaction-row">

      {/* ICON */}

      <div
        className={`transaction-row-icon ${
          positive
            ? "positive"
            : "negative"
        }`}
      >
        {icon}
      </div>


      {/* INFORMATION */}

      <div className="transaction-row-info">

        <strong>
          {title}
        </strong>

        <span>
          {subtitle}
        </span>

      </div>


      {/* DATE */}

      <span className="transaction-date">
        {date}
      </span>


      {/* STATUS */}

      <span className="transaction-status">
        {status}
      </span>


      {/* AMOUNT */}

      <strong
        className={`transaction-amount ${
          positive
            ? "positive-text"
            : "negative-text"
        }`}
      >
        {amount}
      </strong>


      {/* MORE */}

      <button className="transaction-more">

        <MoreHorizontal size={17} />

      </button>

    </div>
  );
}

export default Dashboard;