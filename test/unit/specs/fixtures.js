const bills = [
  {
    id: 1,
    amount: 60,
    date: 1530419702598,
    property_id: 1,
  },
  {
    id: 2,
    amount: 50,
    date: 1530419702598,
    property_id: 1,
  },
  {
    id: 3,
    amount: 40,
    date: 1530419702598,
    property_id: 2,
  },
];

const properties = [
  { id: 1, name: 'Zion' },
  { id: 2, name: 'Ash' },
  { id: 3, name: 'Thornton' },
];

const tenants = [
  { id: 1, name: 'lee', property_id: 1, active: true },
  { id: 2, name: 'Jay', property_id: 3, active: true },
  { id: 3, name: 'Mom', property_id: 3, active: true },
  { id: 4, name: 'Ba', property_id: 3, active: true },
];

module.exports = {
  bills,
  properties,
  tenants,
};
