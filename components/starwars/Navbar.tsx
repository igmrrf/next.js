import React, { Dispatch, SetStateAction, useState } from 'react';

const Navbar = ({ setPage }: { setPage: Dispatch<SetStateAction<string>> }) => {
  return (
    <nav>
      <button onClick={() => setPage('people')}>People</button>
      <button onClick={() => setPage('planets')}>Planets</button>
    </nav>
  );
};

export default Navbar;
