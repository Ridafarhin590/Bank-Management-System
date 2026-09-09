import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  ShieldCheck,
  ShieldOff,
  RefreshCw,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import api from "../api";

const Admin = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD ADMIN DATA
  // =====================================================

  const loadAdminData = useCallback(async () => {
    try {
      setError("");

      const [customersResponse, accountsResponse] =
        await Promise.all([
          api.get("/admin/customers"),
          api.get("/admin/accounts"),
        ]);

      setCustomers(customersResponse.data);
      setAccounts(accountsResponse.data);
    } catch (error) {
      console.error("Admin data error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (error.response?.status === 403) {
        setError(
          "Access denied. Admin privileges are required."
        );
        return;
      }

      setError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // =====================================================
  // LOAD DATA WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadAdminData();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadAdminData]);

  // =====================================================
  // BLOCK ACCOUNT
  // =====================================================

  const handleBlock = async (accountNumber) => {
    try {
      setActionLoading(accountNumber);

      await api.put(
        `/admin/accounts/${accountNumber}/block`
      );

      await loadAdminData();

      alert("Account blocked successfully.");
    } catch (error) {
      console.error("Block account error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to block the account."
      );
    } finally {
      setActionLoading("");
    }
  };

  // =====================================================
  // UNBLOCK ACCOUNT
  // =====================================================

  const handleUnblock = async (accountNumber) => {
    try {
      setActionLoading(accountNumber);

      await api.put(
        `/admin/accounts/${accountNumber}/unblock`
      );

      await loadAdminData();

      alert("Account unblocked successfully.");
    } catch (error) {
      console.error("Unblock account error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to unblock the account."
      );
    } finally {
      setActionLoading("");
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const activeAccounts = accounts.filter(
    (account) => account.status === "ACTIVE"
  ).length;

  const blockedAccounts = accounts.filter(
    (account) => account.status === "BLOCKED"
  ).length;

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="admin-loading">
        <RefreshCw
          size={28}
          className="admin-loading-icon"
        />

        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  return (
    <div className="admin-page">

      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside className="admin-sidebar">

        {/* LOGO */}

        <div className="admin-logo">

          <div className="admin-logo-icon">
            <Building2 size={22} />
          </div>

          <div>
            <h2>BankFlow</h2>
            <span>Administration</span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="admin-nav">

          {/* DASHBOARD */}

          <button
            type="button"
            className="admin-nav-item active"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          {/* CUSTOMERS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() => {
              document
                .getElementById("customers-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            <Users size={18} />
            Customers
          </button>

          {/* ACCOUNTS */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() => {
              document
                .getElementById("accounts-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            <Building2 size={18} />
            Accounts
          </button>

        </nav>

        {/* LOGOUT */}

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div>

            <p className="admin-label">
              ADMINISTRATION
            </p>

            <h1>Admin Dashboard</h1>

            <p className="admin-subtitle">
              Manage customers and bank accounts
            </p>

          </div>

          {/* REFRESH */}

          <button
            type="button"
            className="admin-refresh"
            onClick={loadAdminData}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </header>

        {/* ERROR */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="admin-stats">

          {/* TOTAL CUSTOMERS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <Users size={22} />
            </div>

            <div>
              <span>Total Customers</span>

              <strong>
                {customers.length}
              </strong>
            </div>

          </div>

          {/* TOTAL ACCOUNTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <Building2 size={22} />
            </div>

            <div>
              <span>Total Accounts</span>

              <strong>
                {accounts.length}
              </strong>
            </div>

          </div>

          {/* ACTIVE ACCOUNTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <span>Active Accounts</span>

              <strong>
                {activeAccounts}
              </strong>
            </div>

          </div>

          {/* BLOCKED ACCOUNTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <ShieldOff size={22} />
            </div>

            <div>
              <span>Blocked Accounts</span>

              <strong>
                {blockedAccounts}
              </strong>
            </div>

          </div>

        </section>

        {/* =================================================
            CUSTOMERS SECTION
            ================================================= */}

        <section
          className="admin-section"
          id="customers-section"
        >

          {/* SECTION HEADER */}

          <div className="admin-section-header">

            <div>
              <h2>Customers</h2>

              <p>
                Registered BankFlow customers
              </p>
            </div>

            <span className="admin-count">
              {customers.length}
            </span>

          </div>

          {/* CUSTOMER TABLE */}

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>

                {customers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="admin-empty"
                    >
                      No customers found.
                    </td>
                  </tr>

                ) : (

                  customers.map((customer) => (

                    <tr key={customer.id}>

                      <td>
                        #{customer.id}
                      </td>

                      <td>
                        <strong>
                          {customer.name}
                        </strong>
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>
                        {customer.phone || "—"}
                      </td>

                      <td>
                        <span className="admin-role">
                          {customer.role}
                        </span>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            ACCOUNTS SECTION
            ================================================= */}

        <section
          className="admin-section"
          id="accounts-section"
        >

          {/* SECTION HEADER */}

          <div className="admin-section-header">

            <div>
              <h2>Bank Accounts</h2>

              <p>
                Manage customer bank accounts
              </p>
            </div>

            <span className="admin-count">
              {accounts.length}
            </span>

          </div>

          {/* ACCOUNT TABLE */}

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Account Number</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {accounts.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="admin-empty"
                    >
                      No accounts found.
                    </td>
                  </tr>

                ) : (

                  accounts.map((account) => (

                    <tr key={account.id}>

                      {/* ACCOUNT NUMBER */}

                      <td>
                        <strong>
                          {account.accountNumber}
                        </strong>
                      </td>

                      {/* ACCOUNT TYPE */}

                      <td>
                        {account.accountType || "—"}
                      </td>

                      {/* BALANCE */}

                      <td>
                        ₹
                        {Number(
                          account.balance || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`admin-status ${
                            account.status === "ACTIVE"
                              ? "active"
                              : account.status === "BLOCKED"
                              ? "blocked"
                              : "closed"
                          }`}
                        >
                          {account.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        {account.status === "BLOCKED" ? (

                          <button
                            type="button"
                            className="admin-action-button unblock"
                            disabled={
                              actionLoading ===
                              account.accountNumber
                            }
                            onClick={() =>
                              handleUnblock(
                                account.accountNumber
                              )
                            }
                          >

                            <ShieldCheck size={15} />

                            {actionLoading ===
                            account.accountNumber
                              ? "Processing..."
                              : "Unblock"}

                          </button>

                        ) : account.status === "ACTIVE" ? (

                          <button
                            type="button"
                            className="admin-action-button block"
                            disabled={
                              actionLoading ===
                              account.accountNumber
                            }
                            onClick={() =>
                              handleBlock(
                                account.accountNumber
                              )
                            }
                          >

                            <ShieldOff size={15} />

                            {actionLoading ===
                            account.accountNumber
                              ? "Processing..."
                              : "Block"}

                          </button>

                        ) : (

                          <span className="admin-disabled">
                            Closed
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Admin;