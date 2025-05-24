import React from "react";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, we couldn’t find the page you’re looking for.</p>
      </div>
    </>
  );
}
