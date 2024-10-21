"use client";
import React from "react";

import MainLogo from "@/public/MainLogo";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Switch } from "@nextui-org/switch";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import { useTheme } from "next-themes";

const Nav = () => {
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Jobs Interns", "Features", "Contact Us"];

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  // if currentPath matches any of the menu items, set the menu color to primary
  const currentMenuItem = menuItems.find((item) =>
    currentPath.includes(item.toLowerCase().replace(" ", "_"))
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme || "light");
  }, [theme]);

  const session = null;

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl" isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} href={"/"}>
          <MainLogo />
          <p className="font-bold text-inherit">Next Intern</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              color={
                item === currentMenuItem
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={`/${item.toLowerCase().replace(" ", "_")}`}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            defaultSelected
            size="lg"
            color="success"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </NavbarItem>
        {!session ? (
          <>
            <NavbarItem>
              <Button
                onClick={() => signIn()}
                color="success"
                href="login"
                variant="light"
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="secondary"
                href="/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : null}
      </NavbarContent>

      {/* Menu portion */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={`/${item.toLowerCase().replace(" ", "_")}`}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* End portion */}
      {session && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="gap-2 h-14">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                onClick={() => signOut()}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default Nav;
