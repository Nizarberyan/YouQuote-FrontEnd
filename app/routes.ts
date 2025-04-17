import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("register", "routes/register.tsx"),
  route("quotes/:quoteId", "routes/quote.tsx"),
  route("quotes", "routes/quotes.tsx"),
  route("login", "routes/login.tsx"),
  route("verify-email", "routes/ConfirmEmailMessage.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("authors", "routes/authors.tsx"),
] satisfies RouteConfig;
