import React, { FC, ReactNode } from "react";
import Head from "next/head";

import styles from "./Layout.module.scss";

type Props = {
  children?: ReactNode;
  title?: string;
};
const Layout: FC<Props> = ({ children, title = "This is the default title" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={styles.layout}>
      <div className={styles.layout__mainArea}>{children}</div>
    </div>
  </div>
);

export default Layout;
