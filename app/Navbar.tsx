"use client"

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";


export default function Component() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="https:\\www.github.com/Aucheri">
        <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Aucheri Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">React and WebForms Integration</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/login">Login</NavbarLink>
        <NavbarLink href="/claims">Claims</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}