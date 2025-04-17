import type { Route } from "./+types/home";
import Welcome from "~/components/Welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome.tsx to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
