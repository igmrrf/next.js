import React from "react";

type IProps = {
  title: string;
};
const Header = ({ title }: IProps) => {
  return (
    <header>
      <h1>
        The<strong>{title}</strong>Database
      </h1>
    </header>
  );
};

export default Header;
