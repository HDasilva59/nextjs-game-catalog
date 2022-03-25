import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

const Userprofile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user){
    return (
      <div>Log in before, please</div>
    )
  }
  return (
    user && (
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    )
  );
}

export default Userprofile;
