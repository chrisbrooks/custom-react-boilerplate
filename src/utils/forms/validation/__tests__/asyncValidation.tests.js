import asyncValidation from '../asyncValidation';

it('should validate that atleast one of the sites checkboxes is selected', () => {

  const siteList = [
    {
      id: 1223,
      name: 'balhsd',
      value: false
    },
    {
      id: 676767,
      name: 'balhssdsdd',
      value: false
    }
  ];

  expect(asyncValidation({ sites: siteList }).sites).toEqual(
    'At least one site must be selected'
  );

});
