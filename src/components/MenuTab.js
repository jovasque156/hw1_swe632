import React from "react";
import PropTypes from "prop-types";
import styles from "../css/component.module.css";

const MenuTab = (props) => {
  return (
    <div className={` ${styles["container"]} ${styles[props.rootClassName]} `}>
      <span className={styles["text"]}>{props.menu}</span>
    </div>
  );
};

MenuTab.defaultProps = {
  rootClassName: "",
  menu: "Menu"
};

MenuTab.propTypes = {
  rootClassName: PropTypes.string,
  menu: PropTypes.string
};

export default MenuTab;
