import { Partner } from '../partner.entity';

test('deve criar um evento a partir do parceiro', () => {
  const partner = Partner.create({
    name: 'Parceiro 1',
  });

  const event = partner.initEvent({
    name: 'Evento 1',
    description: 'Descrição do evento 1',
    date: new Date(),
  });

  expect(event.partner_id.value).toBe(partner.id.value);
});
