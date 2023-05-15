import { ChildrenType } from "utils/types";
import styles from "./AppLayout.module.scss";
import ThemeToggler from "components/ThemeToggler";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Link from "next/link";
const AppLayout = ({ children }: ChildrenType) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <Image src={Logo} alt="learnbuddy" fill />
        </Link>
      </div>
      <div className={styles["theme-toggle"]}>
        <ThemeToggler />
      </div>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
};

export default AppLayout;
