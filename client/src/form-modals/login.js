export default [
  {
    field: 'email',
    name: 'Email',
    required: true,
    pattern: /^rizan$/,
    minLength: 5,
    maxLength: 100
  },
  {
    field: 'password',
    name: 'Password',
    required: true
  }
];
