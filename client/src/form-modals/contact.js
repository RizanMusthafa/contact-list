import FormValidate from '../common/form-validate';

export default new FormValidate([
  {
    field: 'firstName',
    name: 'First Name',
    required: true,
    minLength: 2,
    maxLength: 100
  },
  {
    field: 'lastName',
    name: 'Last Name',
    required: true,
    minLength: 2,
    maxLength: 100
  },
  {
    field: 'email',
    name: 'Email',
    required: true,
    minLength: 5,
    maxLength: 150
  },
  {
    field: 'profacian',
    name: 'Profacian',
    minLength: 2,
    maxLength: 100
  },
  {
    field: 'address',
    name: 'Address',
    minLength: 2,
    maxLength: 100
  }
]);
