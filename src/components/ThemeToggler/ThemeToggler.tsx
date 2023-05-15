import { FormControl, Switch, useColorMode } from "@chakra-ui/react";
import { BsFillSunFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

import styles from "./ThemeToggler.module.scss";

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const iconClassName = styles["icon"];
  return (
    <div>
      <FormControl className={styles["container"]}>
        <label htmlFor="theme-toggle">
          {!isDarkMode ? (
            <BsFillSunFill className={iconClassName} />
          ) : (
            <MdDarkMode className={iconClassName} />
          )}
        </label>
        <Switch
          name="theme-toggle"
          onChange={toggleColorMode}
          defaultChecked={!isDarkMode}
          size="md"
        ></Switch>
      </FormControl>
    </div>
  );
};

export default ThemeToggler;
