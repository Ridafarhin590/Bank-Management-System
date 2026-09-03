import {
  ArrowRight,
  CreditCard,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Mail,
  Check,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
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

    if (!formData.email || !formData.password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;

      if (!token) {
        alert("Login failed. Token was not received.");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", token);

      // Save email so we can use it later for customer information
      localStorage.setItem("userEmail", formData.email);

      // Remember me
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          alert("Invalid email or password.");
        } else {
          alert(
            error.response.data?.message ||
              "Login failed. Please try again."
          );
        }
      } else {
        alert(
          "Unable to connect to the server. Make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/*     LEFT SIDE    */}

      <div className="auth-left">

        {/* LOGO */}

        <Link to="/" className="auth-brand">

          <div className="brand-icon">
            <CreditCard size={21} />
          </div>

          <span className="brand-name">
            BankFlow
          </span>

        </Link>


        {/* CONTENT */}

        <div className="auth-left-content">

          <span className="auth-label">
            SECURE DIGITAL BANKING
          </span>

          <h1>
            Your money.
            <br />
            <span>your control.</span>
          </h1>

          <p>
            Access your accounts, manage transactions, and
            stay in control of your finances from one secure
            banking platform.
          </p>


          {/* BENEFITS */}

          <div className="auth-benefits">

            <div className="auth-benefit">

              <div className="auth-benefit-icon">
                <ShieldCheck size={18} />
              </div>

              <div>

                <strong>
                  Secure & protected
                </strong>

                <span>
                  Your information is protected with modern security.
                </span>

              </div>

            </div>


            <div className="auth-benefit">

              <div className="auth-benefit-icon">
                <LockKeyhole size={18} />
              </div>

              <div>

                <strong>
                  JWT authentication
                </strong>

                <span>
                  Secure authentication keeps your account protected.
                </span>

              </div>

            </div>


            <div className="auth-benefit">

              <div className="auth-benefit-icon">
                <Check size={18} />
              </div>

              <div>

                <strong>
                  Easy banking management
                </strong>

                <span>
                  Manage your account and transactions from one place.
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="auth-left-footer">
          © 2026 BankFlow. Modern banking made simple.
        </div>

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="auth-right">

        <div className="register-container">

          {/* MOBILE LOGO */}

          <Link
            to="/"
            className="auth-mobile-brand"
          >

            <div className="brand-icon">
              <CreditCard size={20} />
            </div>

            <span className="brand-name">
              BankFlow
            </span>

          </Link>


          {/* HEADER */}

          <div className="auth-form-header">

            <span className="auth-form-label">
              WELCOME BACK
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to access your BankFlow account.
            </p>

          </div>


          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#2563eb",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() =>
                    alert("Password reset will be connected later.")
                  }
                >
                  Forgot password?
                </button>

              </div>


              <div className="input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* REMEMBER ME */}

            <label className="terms-checkbox">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              <span className="custom-checkbox">

                {rememberMe && (
                  <Check size={13} />
                )}

              </span>

              <span>
                Remember me
              </span>

            </label>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >

              {loading ? "Signing in..." : "Sign In"}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* REGISTER */}

          <div className="auth-switch">

            New to BankFlow?

            <Link to="/register">
              Create an account
            </Link>

          </div>


          {/* SECURITY */}

          <div className="auth-security">

            <ShieldCheck size={16} />

            <span>
              Protected with secure authentication
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;