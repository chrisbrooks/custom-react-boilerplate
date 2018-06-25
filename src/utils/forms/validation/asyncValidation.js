const asyncValidation = (values) => {
  const errors = {};

  if (values.sites) {

    const siteValues = values.sites.map(i => i.value);

    if (siteValues.every(x => x === false)) {
      errors.sites = 'At least one site must be selected';
    }
  }

  return errors;
};

export default asyncValidation;
