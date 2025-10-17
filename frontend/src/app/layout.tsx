import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Collect recipes and create shopping lists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <a href="/">Recipe App</a>
            </h1>
            <ul className="flex gap-6">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/recipes" className="hover:underline">
                  Recipes
                </a>
              </li>
              <li>
                <a href="/shopping-lists" className="hover:underline">
                  Shopping Lists
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}