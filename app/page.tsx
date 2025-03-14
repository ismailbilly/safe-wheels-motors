import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <h1 className="font-bold">
      Hello {" "}
      <Button variant="secondary">Secondary</Button>
    </h1>
  );
}
