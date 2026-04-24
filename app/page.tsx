import type { Metadata } from "next";
import Index from "./Index";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function HomePage() {
  return <Index />;
}
