import { Partner } from '../partner.entity';
import { initOrm } from './helpers';

describe('Partner tests', () => {
  initOrm();

  test('deve criar um evento a partir do parceiro', () => {
    const partner = Partner.create({
      name: 'Parceiro 1',
    });

    const event = partner.initEvent({
      name: 'Evento 1',
      description: 'Descrição do evento 1',
      date: new Date(),
    });

    partner.changeName('Parceiro 1 alterado');

    expect(event.partner_id.value).toBe(partner.id.value);

    expect(partner.name).toBe('Parceiro 1 alterado');
    expect(partner.events.size).toBe(2);

    // console.log(event);
    // console.log(partner);
  });
});
