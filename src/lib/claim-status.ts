import type { ClaimStatus } from "~/data/types";

export const claimStatusBadge: Record<ClaimStatus, string> = {
  submitted: "bg-sunset/15 text-warm",
  under_review: "bg-giraffe-light/40 text-warm",
  approved: "bg-giraffe/20 text-warm",
  denied: "bg-destructive/15 text-destructive",
  paid: "bg-warm text-cream",
};

export const claimStatusDot: Record<ClaimStatus, string> = {
  submitted: "bg-sunset",
  under_review: "bg-giraffe",
  approved: "bg-giraffe-dark",
  denied: "bg-destructive",
  paid: "bg-warm",
};
