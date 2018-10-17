class FormValidate {
  report = {
    isValid: true,
    err: {}
  };
  fields = [];
  constructor([
    { field, name, required, pattern, min, max, minLength, maxLength }
  ]) {
    arguments[0].forEach(fl => {
      if (!fl.field) throw new Error('"field is requried to validate forms"');
      else this.fields[fl.field] = fl;
    });
    // console.log(this.fields);
  }
  validate(value = {}) {
    let isVal = true;
    for (let field in this.fields) {
      this.report.err[field] = this.validateOne(
        this.fields[field],
        value[field]
      );
      isVal *= Boolean(this.report.err[field].length === 0);
    }
    this.report.isValid = isVal;
    return this.report;
  }

  validateOne(
    schema = {
      field: '',
      name: '',
      required: false,
      pattern: null,
      min: null,
      max: null,
      minLength: null,
      maxLength: null
    },
    value
  ) {
    const errors = [];
    if (!schema.name) schema.name = schema.field;
    if (schema.required && !value) errors.push(`${schema.name} is required`);
    if (schema.pattern && value)
      if (schema.pattern.test(value))
        errors.push(`${schema.name} is mismatched with a valide pattern`);
    if (value && typeof value === 'number') {
      if (schema.min && value < schema.min)
        errors.push(`${schema.name} can not be lower than ${schema.min}`);
      if (schema.max && value > schema.max)
        errors.push(`${schema.name} can not be higher than ${schema.max}`);
    }
    if (value && typeof value === 'string') {
      if (schema.minLength && value.length < schema.minLength)
        errors.push(
          `${schema.name} can not be shorter than ${
            schema.minLength
          } charecters`
        );
      if (schema.maxLength && value.length > schema.maxLength)
        errors.push(
          `${schema.name} can not be longer than ${schema.maxLength} charecters`
        );
    }
    return errors;
  }
}

export default FormValidate;
