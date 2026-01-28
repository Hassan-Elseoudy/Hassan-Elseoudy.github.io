import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";

export const metadata: Metadata = {
  title: "404 - Page not found | semsem.dev",
};

export default function NotFound() {
  return (
    <NotFoundComponent
      title="Error 404!"
      description="Oopsies! This page does not exist on semsem.dev. While you're here, you can read some featured post below."
    />
  );
}
