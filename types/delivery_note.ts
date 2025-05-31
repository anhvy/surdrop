export interface DeliveryNote {
  sender: {
    name: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
  package: {
    weight: number;
    size: {
      width: number;
      height: number;
      length: number;
    };
    note: string;
  };
}
