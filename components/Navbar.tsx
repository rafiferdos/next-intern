"use client";

import MainLogo from "@/public/MainLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ["Profile", "Dashboard", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <MainLogo />
          <p className="font-bold text-inherit">Next Intern</p>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
