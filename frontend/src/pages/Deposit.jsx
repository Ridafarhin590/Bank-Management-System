import {
  ArrowLeft,
  ArrowDownToLine,
  CreditCard,
  ShieldCheck,
  Wallet,
  IndianRupee,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Deposit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountId: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountId) {
      alert("Please enter your account ID.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/transactions/deposit",
        {
          accountId: Number(formData.accountId),
          amount: Number(formData.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Deposit successful:", response.data);

      alert("Money deposited successfully!");

      setFormData({
        accountId: "",
        amount: "",
      });

      navigate("/account");
    } catch (error) {
      console.error("Deposit error:", error);

      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Deposit failed.";

        alert(message);
      } else if (error.request) {
        alert(
          "Unable to connect to the server. Please make sure Spring Boot is running."
        );
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-page">

      {/* Header */}
      <header className="transaction-header">

        <Link to="/dashboard" className="transaction-back">
        <ArrowLeft size={18} />
         Back to Dashboard
        </Link>
        <Link to="/" className="transaction-brand">
          <div className="brand-icon">
            <CreditCard size={20} />
          </div>

          <span className="brand-name">
            BankFlow
          </span>
        </Link>

      </header>

      {/* Main */}
      <main className="transaction-main">

        <div className="transaction-container">

          {/* Left Content */}
          <div className="transaction-intro">

            <span className="account-label">
              DEPOSIT MONEY
            </span>

            <h1>
              Add money
              <br />
              <span>to your account.</span>
            </h1>

            <p>
              Add funds to your BankFlow account quickly
              and securely.
            </p>

            <div className="transaction-benefits">

              <div className="transaction-benefit">

                <div className="transaction-benefit-icon">
                  <Wallet size={18} />
                </div>

                <div>
                  <strong>Grow your balance</strong>

                  <span>
                    Add money directly to your BankFlow account.
                  </span>
                </div>

              </div>

              <div className="transaction-benefit">

                <div className="transaction-benefit-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>Secure deposits</strong>

                  <span>
                    Your transaction is protected with secure
                    authentication.
                  </span>
                </div>

              </div>

              <div className="transaction-benefit">

                <div className="transaction-benefit-icon">
                  <ArrowDownToLine size={18} />
                </div>

                <div>
                  <strong>Simple process</strong>

                  <span>
                    Enter your account ID and the amount you
                    want to deposit.
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Deposit Card */}
          <div className="transaction-card">

            <div className="transaction-card-header">

              <div className="transaction-card-icon">
                <ArrowDownToLine size={22} />
              </div>

              <div>
                <span>DEPOSIT</span>

                <h2>
                  Add funds
                </h2>
              </div>

            </div>

            <form
              className="transaction-form"
              onSubmit={handleSubmit}
            >

              {/* Account ID */}
              <div className="form-group">

                <label htmlFor="accountId">
                  Account ID
                </label>

                <div className="input-wrapper">

                  <CreditCard size={18} />

                  <input
                    id="accountId"
                    name="accountId"
                    type="number"
                    placeholder="Enter your account ID"
                    value={formData.accountId}
                    onChange={handleChange}
                    required
                  />

                </div>

                <span className="input-hint">
                  Enter the account where the money should be deposited.
                </span>

              </div>

              {/* Amount */}
              <div className="form-group">

                <label htmlFor="amount">
                  Deposit Amount
                </label>

                <div className="input-wrapper">

                  <IndianRupee size={18} />

                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter deposit amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Summary */}
              {formData.amount &&
                Number(formData.amount) > 0 && (
                  <div className="transaction-summary">

                    <span>
                      Deposit amount
                    </span>

                    <strong>
                      ₹
                      {Number(
                        formData.amount
                      ).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </strong>

                  </div>
                )}

              {/* Submit */}
              <button
                type="submit"
                className="transaction-submit"
                disabled={loading}
              >
                {loading ? (
                  "Processing Deposit..."
                ) : (
                  <>
                    Deposit Money
                    <ArrowDownToLine size={17} />
                  </>
                )}
              </button>

            </form>

            <div className="transaction-security">

              <ShieldCheck size={16} />

              <span>
                Your deposit is protected with secure authentication.
              </span>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Deposit;