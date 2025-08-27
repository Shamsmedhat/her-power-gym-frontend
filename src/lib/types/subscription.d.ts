declare type Subscription = {
  _id: string;
  name: string; // e.g. "Monthly", "Yearly", "Private 20 sessions"
  type: "main" | "private";
  durationDays?: number;
  totalSessions: number; // defaults to 0 if not provided
  price: number;
  description?: string;
};
