import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

function IssuesPage() {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
}

export default IssuesPage;
