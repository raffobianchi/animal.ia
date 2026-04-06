"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { mockPolicy, mockPet, planPricing } from "~/data/mock-data";

export default function PoliciesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm">
            {isIt ? "Le tue Polizze" : "Your Policies"}
          </h1>
          <p className="text-muted-foreground">
            {isIt ? "Gestisci le tue coperture assicurative" : "Manage your insurance coverage"}
          </p>
        </div>
        <Link
          href={`/${locale}/dashboard/policies/new`}
          className={cn(buttonVariants(), "bg-giraffe text-warm hover:bg-giraffe-dark")}
        >
          {isIt ? "+ Nuova Polizza" : "+ New Policy"}
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl text-warm">
              {isIt ? "Piano" : "Plan"} {planPricing[mockPolicy.plan]?.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {isIt ? "Per" : "For"} {mockPet.name} · {mockPet.breed}
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            {isIt ? "Attiva" : "Active"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {isIt ? "Premio Mensile" : "Monthly Premium"}
              </p>
              <p className="text-lg font-bold text-warm">€{mockPolicy.monthlyPremium}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {isIt ? "Data Inizio" : "Start Date"}
              </p>
              <p className="text-lg font-bold text-warm">{mockPolicy.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {isIt ? "Scadenza" : "End Date"}
              </p>
              <p className="text-lg font-bold text-warm">{mockPolicy.endDate}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-warm mb-3">
              {isIt ? "Cosa copre:" : "What's covered:"}
            </p>
            <ul className="space-y-2">
              {mockPolicy.coverageDetails.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-giraffe">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
