import {
  ArrowRight,
  CreditCard,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Check,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  //  HANDLE INPUT CHANGES

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  //  HANDLE REGISTRATION

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check terms
    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    // Check password
    if (formData.password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    // Check confirm password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Send registration data to Spring Boot
      const response = await api.post("/auth/register", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);

      alert("Account created successfully!");

      // Go to login page
      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Registration failed.";

        alert(message);
      } else if (error.request) {
        alert(
          "Unable to connect to the server. Please make sure Spring Boot is running on port 8080."
        );
      } else {
        alert("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/*    LEFT SIDE    */}

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


        {/* LEFT CONTENT */}

        <div className="auth-left-content">

          <span className="auth-label">
            SECURE DIGITAL BANKING
          </span>

          <h1>
            Start your
            <br />
            <span>financial journey.</span>
          </h1>

          <p>
            Create your BankFlow account and manage your
            money with a simple, secure, and modern banking
            experience.
          </p>


          {/*   BENEFIT 1   */}

          <div className="auth-benefits">

            <div className="auth-benefit">

              <div className="auth-benefit-icon">
                <ShieldCheck size={18} />
              </div>

              <div>

                <strong>
                  Secure by design
                </strong>

                <span>
                  Your account is protected with modern security.
                </span>

              </div>

            </div>


            {/*     BENEFIT 2    */}

            <div className="auth-benefit">

              <div className="auth-benefit-icon">
                <LockKeyhole size={18} />
              </div>

              <div>

                <strong>
                  Protected credentials
                </strong>

                <span>
                  Your password is securely encrypted.
                </span>

              </div>

            </div>


            {/*   BENEFIT 3   */}

            <div className="auth-benefit">

              <div className="auth-benefit-icon">
                <Check size={18} />
              </div>

              <div>

                <strong>
                  Easy account management
                </strong>

                <span>
                  Access your balance and transactions in one place.
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


      {/*   RIGHT SIDE  */}

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


          {/*    FORM HEADER    */}

          <div className="auth-form-header">

            <span className="auth-form-label">
              CREATE ACCOUNT
            </span>

            <h2>
              Open your account
            </h2>

            <p>
              Enter your details to get started with BankFlow.
            </p>

          </div>


          {/*   REGISTRATION FORM   */}

          <form
            className="auth-form register-form"
            onSubmit={handleSubmit}
          >

            {/* FULL NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">

                <User size={18} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <div className="input-wrapper">

                <Phone size={18} />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />

              </div>

            </div>


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


            {/* ADDRESS */}

            <div className="form-group">

              <label htmlFor="address">
                Address
              </label>

              <div className="input-wrapper">

                <MapPin size={18} />

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
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

              <span className="input-hint">
                Use at least 6 characters.
              </span>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* TERMS & CONDITIONS */}

            <label className="terms-checkbox">

              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) =>
                  setAcceptedTerms(e.target.checked)
                }
              />

              <span className="custom-checkbox">

                {acceptedTerms && (
                  <Check size={13} />
                )}

              </span>

              <span>
                I agree to the{" "}

                <a href="#terms">
                  Terms & Conditions
                </a>

                {" "}and{" "}

                <a href="#privacy">
                  Privacy Policy
                </a>

                .
              </span>

            </label>


            {/*    SUBMIT BUTTON    */}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"
              }

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/*     LOGIN LINK   */}

          <div className="auth-switch">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </div>


          {/*    SECURITY MESSAGE  */}

          <div className="auth-security">

            <ShieldCheck size={16} />

            <span>
              Your information is protected with secure
              authentication.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;