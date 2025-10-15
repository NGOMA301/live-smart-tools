"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Load the Google tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N31VRKBTVH"
        strategy="afterInteractive"
      />

      {/* Initialize the tag */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N31VRKBTVH');
        `}
      </Script>
    </>
  );
}
