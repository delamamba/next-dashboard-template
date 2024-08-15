// font.js
export const lusitana = {
  className: 'font-lusitana',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased`}>{children}</body>
    </html>
  );
}