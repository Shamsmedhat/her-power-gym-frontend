declare type Client = {
  _id: string;
  name: string;
  phone: string;
  clientId: string;

  subscription: {
    plan: {
      _id: Types.ObjectId;
      name: string;
      type: string;
      durationDays: number;
      totalSessions: number;
      price: number;
      description: string;
    };
    priceAtPurchase: number;
    startDate: Date;
    endDate: Date;
  };

  privatePlan?: {
    plan?: {
      _id: Types.ObjectId;
      name: string;
      type: string;
      totalSessions: number;
      price: number;
      description: string;
      durationDays: number;
    };
    coach?: {
      _id: Types.ObjectId;
      name: string;
      phone: string;
    };
    totalSessions?: number;
    sessions?: Types.ObjectId[];
    priceAtPurchase?: number;
  };
};
