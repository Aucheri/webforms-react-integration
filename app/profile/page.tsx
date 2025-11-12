// src/pages/Profile.tsx
"use client"
import React from "react";
import { useAuth } from "../auth/AuthProvider";
 
export default function Profile() {
  const { user, loading } = useAuth();
 
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not signed in.</p>;
 
  return (
<div>
<h1>Welcome, {user.name}</h1>
<p>ID: {user.id}</p>
<p>Roles: {user.roles.join(", ")}</p>
</div>
  );
}