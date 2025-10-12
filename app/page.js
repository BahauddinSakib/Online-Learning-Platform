import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
       <h1>Hello Sakib</h1>
       <Button variant="outline">Button</Button>
       <UserButton/>
    </div>
  );
}
