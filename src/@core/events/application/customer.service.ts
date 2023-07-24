import { Customer } from '../domain/entities/customer.entity';
import { ICustomerRepository } from '../domain/repositories/customer-repository.interface';

export class CustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  list() {
    return this.customerRepository.findAll();
  }

  register(input: { name: string; cpf: string }) {
    const customer = Customer.create(input);
    this.customerRepository.add(customer);
    return customer;
  }
}
