import {
  ArrowLeft,
  ArrowUpFromLine,
  CreditCard,
  ShieldCheck,
  Wallet,
  IndianRupee,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Withdraw() {
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
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/transactions/withdraw",
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

      console.log("Withdrawal successful:", response.data);

      alert("Money withdrawn successfully!");

      setFormData({
        accountId: "",
        amount: "",
      });

      navigate("/account");
    } catch (error) {
      console.error("Withdrawal error:", error);

      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Withdrawal failed.";

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
              WITHDRAW MONEY
            </span>

            <h1>
              Access your
              <br />
              <span>money easily.</span>
            </h1>

            <p>
              Withdraw funds from your BankFlow account
              quickly and securely whenever you need them.
            </p>

            <div className="transaction-benefits">

              <div className="transaction-benefit">

                <div className="transaction-benefit-icon">
                  <Wallet size={18} />
                </div>

                <div>
                  <strong>Easy withdrawals</strong>

                  <span>
                    Withdraw funds directly from your BankFlow account.
                  </span>
                </div>

              </div>

              <div className="transaction-benefit">

                <div className="transaction-benefit-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>Secure transactions</strong>

                  <span>
                    Your transaction is protected with secure
                    authentication.
                  </span>
                </div>

              </div>

              <div className="transaction-benefit">

                <div className="transaction-benefit-icon">
                  <ArrowUpFromLine size={18} />
                </div>

                <div>
                  <strong>Balance protection</strong>

                  <span>
                    Withdrawals are checked against your available balance.
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Withdrawal Card */}
          <div className="transaction-card">

            <div className="transaction-card-header">

              <div className="transaction-card-icon">
                <ArrowUpFromLine size={22} />
              </div>

              <div>
                <span>WITHDRAW</span>

                <h2>
                  Withdraw funds
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
                  Enter the account from which money will be withdrawn.
                </span>

              </div>

              {/* Amount */}
              <div className="form-group">

                <label htmlFor="amount">
                  Withdrawal Amount
                </label>

                <div className="input-wrapper">

                  <IndianRupee size={18} />

                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter withdrawal amount"
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
                      Withdrawal amount
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
                  "Processing Withdrawal..."
                ) : (
                  <>
                    Withdraw Money
                    <ArrowUpFromLine size={17} />
                  </>
                )}
              </button>

            </form>

            <div className="transaction-security">

              <ShieldCheck size={16} />

              <span>
                Your withdrawal is protected with secure authentication.
              </span>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Withdraw;