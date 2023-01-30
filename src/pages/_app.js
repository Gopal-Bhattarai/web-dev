// import '@/styles/globals.css'

import Layout from "@/components/Layout";
import { ProductContextProvider } from "@/components/State/ProductContext";
import DarkModeState from "@/components/State/DarkModeContext";
import { SessionProvider } from "next-auth/react";
import UserState from "@/components/State/UserContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <DarkModeState>
      <SessionProvider session={session}>
        <ProductContextProvider>
          <UserState>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserState>
        </ProductContextProvider>
      </SessionProvider>
    </DarkModeState>
  );
}
