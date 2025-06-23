import * as React from "react";

interface EmailTemplateProps {
  name: string;
  url: string;
}

export const ForgotPasswordEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  url,
}) => (
  <div
    style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f4f7",
      padding: "40px 20px",
      textAlign: "center",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        padding: "40px 30px",
      }}
    >
      <h1 style={{ color: "#333333", fontSize: "24px", marginBottom: "20px" }}>
        Hello, {name} 👋
      </h1>
      <p style={{ color: "#555555", fontSize: "16px", lineHeight: "1.5" }}>
        We received a request to reset your password.
        <br />
        Click the button below to proceed:
      </p>
      <a
        href={url}
        target="_blank"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          textDecoration: "none",
          fontWeight: "600",
          borderRadius: "8px",
        }}
      >
        Reset Your Password
      </a>
      <p
        style={{
          color: "#999999",
          fontSize: "12px",
          marginTop: "40px",
        }}
      >
        If you didn’t request this, you can ignore this email.
      </p>
    </div>
    <p
      style={{
        marginTop: "20px",
        fontSize: "12px",
        color: "#aaaaaa",
      }}
    >
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </p>
  </div>
);
