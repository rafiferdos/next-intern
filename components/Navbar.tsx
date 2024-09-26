"use client";

import MainLogo from "@/public/MainLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
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
        <NavbarItem>
          <Link color="foreground" href="/features">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
