import React from "react";
import styles from "css/App.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.example}>{children}</div>
    </div>
  );
}

export default Layout;
