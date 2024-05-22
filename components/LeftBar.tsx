import React from "react";
import LeftBarContent from "./LeftBarContent";
import { auth } from "@/auth";
import prisma from "@/server/db";

/**
 * Server component for getting data from the database to be passed to the leftbar content.
 */
async function LeftBar() {
  // Get the authenticated user.
  const data = await auth();
  let userInf;
  // If the user is authenticated, get it's data from the database and pass it to the children.
  // If the user is not authenticated, then return isAuthenticated as false and pass the data as null.
  if (data) {
    userInf = await prisma.user.findFirst({
      where: { id: data.user?.id },
    });
  }
  return (
    <LeftBarContent
      imageKey={userInf?.imageKey || null}
      userName={userInf?.name || null}
      isAuthenticated={!!data}
    />
  );
}

export default LeftBar;
