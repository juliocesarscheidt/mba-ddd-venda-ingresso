/* eslint-disable @typescript-eslint/no-empty-function */
export class PaymentGateway {
  constructor() {}

  async payment({
    token,
    amount,
  }: {
    token: string;
    amount: number;
  }): Promise<any> {}
}
