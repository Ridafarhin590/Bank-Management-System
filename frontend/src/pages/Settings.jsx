import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  LockKeyhole,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="settings-header">

        <Link to="/dashboard" className="transaction-back">
         <ArrowLeft size={18} />
         Back to Dashboard
         </Link>

        <Link to="/" className="settings-brand">
          <div className="brand-icon">
            <CreditCard size={20} />
          </div>

          <span className="brand-name">
            BankFlow
          </span>
        </Link>

      </header>

      {/* Main */}
      <main className="settings-main">

        <div className="settings-container">

          {/* Heading */}
          <div className="settings-heading">

            <span className="account-label">
              ACCOUNT SETTINGS
            </span>

            <h1>
              Settings.
            </h1>

            <p>
              Manage your account preferences and security.
            </p>

          </div>

          {/* Security */}
          <section className="settings-card">

            <div className="settings-card-heading">

              <div className="settings-heading-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2>
                  Security
                </h2>

                <p>
                  Manage your account security.
                </p>
              </div>

            </div>

            <div className="settings-option">

              <div className="settings-option-icon">
                <LockKeyhole size={18} />
              </div>

              <div className="settings-option-content">
                <strong>
                  Password & Authentication
                </strong>

                <span>
                  Your account uses secure authentication.
                </span>
              </div>

              <ChevronRight size={18} />

            </div>

            <div className="settings-option">

              <div className="settings-option-icon">
                <ShieldCheck size={18} />
              </div>

              <div className="settings-option-content">
                <strong>
                  Account Protection
                </strong>

                <span>
                  Your banking data is protected by secure APIs.
                </span>
              </div>

              <span className="settings-secure">
                Protected
              </span>

            </div>

          </section>

          {/* Notifications */}
          <section className="settings-card">

            <div className="settings-card-heading">

              <div className="settings-heading-icon">
                <Bell size={19} />
              </div>

              <div>
                <h2>
                  Notifications
                </h2>

                <p>
                  Manage your notification preferences.
                </p>
              </div>

            </div>

            <div className="settings-option">

              <div className="settings-option-icon">
                <Bell size={18} />
              </div>

              <div className="settings-option-content">
                <strong>
                  Transaction Notifications
                </strong>

                <span>
                  Receive updates about your banking transactions.
                </span>
              </div>

              <label className="settings-toggle">
                <input type="checkbox" defaultChecked />
                <span></span>
              </label>

            </div>

          </section>

          {/* Account */}
          <section className="settings-card">

            <div className="settings-card-heading">

              <div className="settings-heading-icon">
                <User size={19} />
              </div>

              <div>
                <h2>
                  Account
                </h2>

                <p>
                  Manage your personal account.
                </p>
              </div>

            </div>

            <Link
              to="/account/profile"
              className="settings-option"
            >

              <div className="settings-option-icon">
                <User size={18} />
              </div>

              <div className="settings-option-content">
                <strong>
                  Personal Information
                </strong>

                <span>
                  View your profile and registered information.
                </span>
              </div>

              <ChevronRight size={18} />

            </Link>

          </section>

          {/* Logout */}
          <section className="settings-danger-card">

            <div className="settings-option-icon">
              <LogOut size={18} />
            </div>

            <div className="settings-option-content">
              <strong>
                Sign out of BankFlow
              </strong>

              <span>
                Remove your current login session from this device.
              </span>
            </div>

            <button
              type="button"
              className="settings-logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </section>

          {/* Security footer */}
          <div className="settings-security">

            <ShieldCheck size={17} />

            <span>
              BankFlow protects your account using secure
              authentication and protected APIs.
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;