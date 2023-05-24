import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AblyChatComponent = dynamic(
  () => import("../components/chat/AblyChatComponent"),
  { ssr: false }
);

export default function Chat() {
  const [username, setUsername] = useState("");
  const id = "645fcc679477b1b285dbc7a4";

  const getContact = async () => {
    try {
      const { data } = await axios.get("/api/chat/getContactName", {
        params: {
          id: id,
        },
      });
      setUsername(data.name + " " + data.surname);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  getContact();

  return (
    <div className="container">
      <Head>
        <title>Realtime Chat App with Ably, NextJS and Vercel</title>
        <link
          rel="icon"
          href="https://static.ably.dev/motif-red.svg?nextjs-vercel"
          type="image/svg+xml"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha384-iBBgrCyberBlbChJLlKDcUWP7t8GwgaKI21Jc6CZP97ZvsjFjE9+3YF5nkvP1kj"
          crossorigin="anonymous"
        />
      </Head>

      <main>
        <h3 className="title">{username}</h3>
        <AblyChatComponent />
      </main>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: 1fr 100px;
          min-height: 100vh;
          // background-color: aqua;
        }

        main {
          display: grid;
          grid-template-rows: auto 1fr;
          width: 70%
          max-width: 900px;
          margin: 20px auto;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12),
            0px 1px 2px rgba(0, 0, 0, 0.24);
          background-color: white;
        }

        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 75px;
          margin: 0;
          color: white;
          background: #383838; 
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: #333; // Dark grey color for text
        }

        * {
          box-sizing: border-box;
        }

        [data-author="me"] {
          display: flex;
          background-color: #f55c7a;
          color: white;
          align-self: flex-end;
          flex-grow: 0;
          border-radius: 20px 5px 20px 20px;
        }

        [data-author="other"] {
          color: #383838;
          align-self: flex-start;
          border-radius: 5px 20px 20px 20px;
        }
      `}</style>
    </div>
  );
}