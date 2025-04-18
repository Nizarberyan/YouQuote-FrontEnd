import { SpecificQuote } from "~/components/SpecificQuote";
import type { Route } from "./+types/quote";
export async function loader({ params }: Route.LoaderArgs) {
  const quoteId = params.quoteId;
  return { quoteId };
}
export default function quote({ loaderData }: Route.ComponentProps) {
  return <SpecificQuote quoteId={loaderData.quoteId} />;
}
