import { Register as RegisterForm } from "~/components/auth/Register";
import type { Route } from "./+types/register";
export async function loader({ params }: Route.LoaderArgs) {}
export async function action() {}
export default function Register() {
  return <RegisterForm />;
}
