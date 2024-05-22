"use client";
import { useSession } from "next-auth/react";
//Mocking page just for testing, if the user is logged in, return the data, else return the authentication screen. Should be done with middleware.
export default function page() {
  const data = useSession();
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  } else {
    return <div>ADFAWFwaf</div>;
  }
}
