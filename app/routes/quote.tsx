import { Quote } from "~/components/Quote";
import type { Route } from "./+types/quote";
export async function loader({ params }: Route.LoaderArgs) {
  const quoteId = params.quoteId;
  return { quoteId };
}
export default function quote({ loaderData }: Route.ComponentProps) {
  return <Quote quoteId={loaderData.quoteId} />;
}
