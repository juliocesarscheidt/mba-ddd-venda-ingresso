import { IUnitOfWork } from '../../../@core/common/application/unit-of-work.interface';
import { Customer } from '../domain/entities/customer.entity';
import { ICustomerRepository } from '../domain/repositories/customer-repository.interface';

export class CustomerService {
  constructor(
    private customerRepository: ICustomerRepository,
    private uow: IUnitOfWork,
  ) {}

  list() {
    return this.customerRepository.findAll();
  }

  async register(input: { name: string; cpf: string }) {
    const customer = Customer.create(input);
    this.customerRepository.add(customer);
    await this.uow.commit();
    return customer;
  }

  async update(id: string, input: { name?: string }) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    if (!input.name) {
      return customer;
    }
    customer.changeName(input.name);
    this.customerRepository.add(customer);
    await this.uow.commit();
    return customer;
  }
}
