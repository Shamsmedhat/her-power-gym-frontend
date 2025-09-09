interface User extends DatabaseProperties {
  _id: string;
  name: string;
  phone: string;
  role: "super-admin" | "admin" | "coach";
  userId: string;

  // Optional fields
  salary?: number;
  clients?: string[];
  daysOff?: string[];
  daysOffHistory: {
    daysOff: string[];
    changedBy: string;
    changedAt?: string;
  }[];
}
