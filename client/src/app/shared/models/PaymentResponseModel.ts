export interface PaymentResponseModel {
  description: string;
  bankCode: string;
  amount: number;
  orderId: string;
  transactioId: string;
  paymentMethod: string;
  terminalId: string;
  vnPayResponseCode: string;
  // public bool Success { get; set; }
  // public string Token { get; set; }
}
