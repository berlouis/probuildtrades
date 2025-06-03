import React from "react";
import { NextPageContext } from "next";
import Head from "next/head";

interface Props {
  statusCode: number;
  err?: Error;
}

function ErrorPage({ statusCode }: Props) {
  return (
    <>
      <Head>
        <title>{statusCode} | Error</title>
      </Head>
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>{statusCode}</h1>
        <p>
          {statusCode === 404
            ? "This page could not be found."
            : "An unexpected error has occurred."}
        </p>
      </div>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

export default ErrorPage;
