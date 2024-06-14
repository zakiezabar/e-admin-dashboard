"use client";

import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

interface LogoutButtonProps {
  children: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    signOut();
  };

  return (
    <Button variant="ghost" onClick={onClick} className="w-full rounded-lg normal-case text-2xl">{children}</Button>
  );
};