import { handleSubmit, mapPropsToValues, validateForm } from '../service';

describe('Login form service', () => {
  describe('validateForm function', () => {
    it('Should return an error "Email required" in email field if email field is empty in values', () => {
      const values = {
        email: '',
        password: '',
      };
      const errors = validateForm(values);

      expect(errors.email).toBe('Email required');
      expect(errors.password).not.toBeDefined();
    });

    it('Should return an empty object if the email is valid', () => {
      const values = {
        password: '',
        email: 'gandalf.leblanc@lacontee.co',
      };
      const errors = validateForm(values);

      expect(errors).toEqual({});
    });
  });

  describe('mapPropsToValues function', () => {
    it('Should return an object with empty fields for email and password fields', () => {
      const expectedValues = {
        email: '',
        password: '',
      };
      expect(mapPropsToValues()).toEqual(expectedValues);
    });
  });
});
