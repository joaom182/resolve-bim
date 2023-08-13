import { ApolloWrapper } from "@/lib/apollo-provider";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-slate-1`}>
      <body className="px-6 sm:px-0">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
