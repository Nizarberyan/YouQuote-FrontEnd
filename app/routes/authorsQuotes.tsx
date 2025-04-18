import { AuthorQuotes } from "~/components/AuthorQuotes";
import type { Route } from "./+types/authorsQuotes";
export async function loader({ params }: Route.LoaderArgs) {
  const authorId = params.authorId;
  return { authorId };
}
export default function AuthorQuotesPage({ loaderData }: Route.ComponentProps) {
  return <AuthorQuotes authorId={loaderData.authorId} />;
}
