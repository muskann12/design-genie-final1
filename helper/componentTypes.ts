export interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    designArea?: string;
    customImage?: boolean;
  }

export type OrderDataType = {
    orderData: {
      items: CartItem[];
      customer: {
        fullName: string;
        email: string;
        contactNumber: string;
        address: {
          city: string;
          area: string;
          fullAddress: string;
        };
      };
      payment: {
        subtotal: number;
        discount: number;
        deliveryFee: number;
        total: number;
      };
      createdAt: string;
    };
  };