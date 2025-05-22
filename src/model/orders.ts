export interface Order {
  userId: string;
  orderId: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  productPrice: Number;
  quantity: Number;
  prodcutImageUrl: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string,
  paymentStatus: Number,
  orderStatus: Number,
  totalPrice: Number,
  shippingFee: Number,
  createdAt: string;
  updatedAt: string;

}

export interface ShippingAddress {
  name: String;
  address: String;
  city: String;
  postalCode: String;
  country: String;
  phoneNumber: String;
}
