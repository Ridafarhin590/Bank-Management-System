import {
  ArrowLeft,
  ArrowLeftRight,
  CreditCard,
  ShieldCheck,
  Send,
  User,
  IndianRupee,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Transfer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    senderAccountId: "",
    receiverAccountId: "",
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

    if (!formData.senderAccountId) {
      alert("Please enter your account ID.");
      return;
    }

    if (!formData.receiverAccountId) {
      alert("Please enter the receiver account ID.");
      return;
    }

    if (formData.senderAccountId === formData.receiverAccountId) {
      alert("Sender and receiver account IDs cannot be the same.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid transfer amount.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/transactions/transfer",
        {
          senderAccountId: Number(formData.senderAccountId),
          receiverAccountId: Number(formData.receiverAccountId),
          amount: Number(formData.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Transfer successful:", response.data);

      alert("Money transferred successfully!");

      setFormData({
        senderAccountId: "",
        receiverAccountId: "",
        amount: "",
      });

      navigate("/account");
    } catch (error) {
      console.error("Transfer error:", error);

      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Transfer failed.";

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

          {/* Left */}
          <div className="transaction-intro">

            <span className="account-label">
              MONEY TRANSFER
            </span>

            <h1>
              Send money
              <br />
              <span>securely.</span>
            </h1>

            <p>
              Transfer money quickly and securely from
              your BankFlow account to another account.
            </p>

            <div className="transaction-benefits">

              <div className="transaction-benefit">
                <div className="transaction-benefit-icon">
                  <Send size={18} />
                </div>

                <div>
                  <strong>Fast transfers</strong>
                  <span>
                    Send money directly between BankFlow accounts.
                  </span>
                </div>
              </div>

              <div className="transaction-benefit">
                <div className="transaction-benefit-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>Secure transaction</strong>
                  <span>
                    Your transfer is protected by JWT authentication.
                  </span>
                </div>
              </div>

              <div className="transaction-benefit">
                <div className="transaction-benefit-icon">
                  <ArrowLeftRight size={18} />
                </div>

                <div>
                  <strong>Easy transfers</strong>
                  <span>
                    Enter the receiver account and amount to continue.
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Form Card */}
          <div className="transaction-card">

            <div className="transaction-card-header">
              <div className="transaction-card-icon">
                <ArrowLeftRight size={22} />
              </div>

              <div>
                <span>TRANSFER MONEY</span>
                <h2>Make a transfer</h2>
              </div>
            </div>

            <form
              className="transaction-form"
              onSubmit={handleSubmit}
            >

              {/* Sender */}
              <div className="form-group">

                <label htmlFor="senderAccountId">
                  Your Account ID
                </label>

                <div className="input-wrapper">
                  <User size={18} />

                  <input
                    id="senderAccountId"
                    name="senderAccountId"
                    type="number"
                    placeholder="Enter your account ID"
                    value={formData.senderAccountId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <span className="input-hint">
                  Enter the account from which money will be sent.
                </span>

              </div>

              {/* Receiver */}
              <div className="form-group">

                <label htmlFor="receiverAccountId">
                  Receiver Account ID
                </label>

                <div className="input-wrapper">
                  <User size={18} />

                  <input
                    id="receiverAccountId"
                    name="receiverAccountId"
                    type="number"
                    placeholder="Enter receiver account ID"
                    value={formData.receiverAccountId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <span className="input-hint">
                  Enter the BankFlow account that should receive the money.
                </span>

              </div>

              {/* Amount */}
              <div className="form-group">

                <label htmlFor="amount">
                  Transfer Amount
                </label>

                <div className="input-wrapper">
                  <IndianRupee size={18} />

                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              {/* Summary */}
              {formData.amount && Number(formData.amount) > 0 && (
                <div className="transaction-summary">

                  <span>Transfer amount</span>

                  <strong>
                    ₹
                    {Number(formData.amount).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
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
                  "Processing Transfer..."
                ) : (
                  <>
                    Transfer Money
                    <Send size={17} />
                  </>
                )}
              </button>

            </form>

            <div className="transaction-security">
              <ShieldCheck size={16} />

              <span>
                Transactions are protected with secure authentication.
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Transfer;