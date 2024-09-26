"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import { useState } from "react";
import MainLogo from '@/app/logo.svg'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        "Profile",
        "Dashboard",
        "Log Out",
      ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
            <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <MainLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;