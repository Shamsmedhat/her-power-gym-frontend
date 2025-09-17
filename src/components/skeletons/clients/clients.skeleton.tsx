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

export default function ClientsTableSkeleton() {
  const t = useTranslations();

  return (
    <Table>
      <TableCaption className="capitalize">{t("loading-clients")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit text-start">{t("client-name")}</TableHead>
          <TableHead className="text-start">{t("client-id")}</TableHead>
          <TableHead className="text-start">{t("clinet-phone")}</TableHead>
          <TableHead className="text-start">{t("clinet-phone")}</TableHead>
          <TableHead className="text-start">{t("subscription")}</TableHead>
          <TableHead className="text-start">
            {t("subscription-start-date")}
          </TableHead>
          <TableHead className="text-start">
            {t("subscription-end-date")}
          </TableHead>
          <TableHead className="text-start">
            {t("subscription-price")}
          </TableHead>
          <TableHead className="text-start">{t("private")}</TableHead>
          <TableHead className="text-start">{t("private-coach")}</TableHead>
          <TableHead className="text-start">{t("private-price")}</TableHead>
          <TableHead className="text-start">{t("total-price")}</TableHead>
          <TableHead className="text-start">{t("delete")}</TableHead>
          <TableHead className="text-start">{t("update")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 13 }).map((_, i) => (
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
