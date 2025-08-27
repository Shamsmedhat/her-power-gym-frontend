declare type Client = {
  _id: string;
  name: string;
  phone: string;
  clientId: string;

  subscription: {
    plan: Types.ObjectId;
    priceAtPurchase: number;
    startDate: Date;
    endDate: Date;
  };

  privatePlan?: {
    plan?: Types.ObjectId;
    coach?: Types.ObjectId;
    totalSessions?: number;
    sessions?: Types.ObjectId[];
    priceAtPurchase?: number;
  };
};
