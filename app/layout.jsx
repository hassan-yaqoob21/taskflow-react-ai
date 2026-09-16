import "./globals.css";

export const metadata = {
  title: "TaskFlow",
  description: "AI-Assisted Task Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}