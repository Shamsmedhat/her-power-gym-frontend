import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export default function SubscriptionTableSkeleton() {
  const t = useTranslations();

  return (
    <Table>
      <TableCaption className="capitalize">
        {t("loading-subscriptions")}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit text-start">
            {t("subscription-name")}
          </TableHead>
          <TableHead className="text-start">{t("subscription-type")}</TableHead>
          <TableHead className="text-start">{t("duration-days")}</TableHead>
          <TableHead className="text-start">{t("total-sections")}</TableHead>
          <TableHead className="text-start">
            {t("subscription-price")}
          </TableHead>
          <TableHead className="text-start">
            {t("subscription-description")}
          </TableHead>
          <TableHead className="text-start">
            {t("update-subscription")}
          </TableHead>
          <TableHead className="text-start">
            {t("delete-subscription")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-40" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-40" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-40" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
