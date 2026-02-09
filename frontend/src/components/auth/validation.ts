// frontend/src/components/auth/validation.ts

// Validation utilities for authentication forms

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

// Common validation rules
export const validationRules = {
  required: (fieldName: string = 'Field'): ValidationRule => ({
    validate: (value: any) => value !== undefined && value !== null && value.trim() !== '',
    message: `${fieldName} is required`,
  }),

  minLength: (min: number, fieldName: string = 'Field'): ValidationRule => ({
    validate: (value: string) => value && value.length >= min,
    message: `${fieldName} must be at least ${min} characters`,
  }),

  maxLength: (max: number, fieldName: string = 'Field'): ValidationRule => ({
    validate: (value: string) => value && value.length <= max,
    message: `${fieldName} must not exceed ${max} characters`,
  }),

  email: (fieldName: string = 'Email'): ValidationRule => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: `${fieldName} must be a valid email address`,
  }),

  passwordStrength: (fieldName: string = 'Password'): ValidationRule => ({
    validate: (value: string) => {
      // At least one uppercase, one lowercase, one number, one special char, min 8 chars
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    },
    message: `${fieldName} must contain at least 8 characters, including uppercase, lowercase, number and special character`,
  }),

  match: (valueToMatch: string, fieldName: string = 'Field'): ValidationRule => ({
    validate: (value: string) => value === valueToMatch,
    message: `${fieldName} does not match`,
  }),
};

// Validation function
export const validateField = (
  value: any,
  rules: ValidationRule[],
  fieldName?: string
): ValidationResult => {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors: fieldName ? { [fieldName]: errors } : {},
  };
};

// Validate multiple fields at once
export const validateForm = (
  formData: Record<string, any>,
  validationSchema: Record<string, ValidationRule[]>
): ValidationResult => {
  const allErrors: Record<string, string[]> = {};

  for (const field in validationSchema) {
    const value = formData[field];
    const fieldRules = validationSchema[field];

    const result = validateField(value, fieldRules, field);
    if (!result.isValid) {
      allErrors[field] = result.errors[field] || [];
    }
  }

  return {
    isValid: Object.keys(allErrors).length === 0,
    errors: allErrors,
  };
};

// Specific validation schemas
export const loginValidationSchema = {
  email: [
    validationRules.required('Email'),
    validationRules.email('Email'),
  ],
  password: [
    validationRules.required('Password'),
  ],
};

export const signupValidationSchema = {
  email: [
    validationRules.required('Email'),
    validationRules.email('Email'),
  ],
  password: [
    validationRules.required('Password'),
    validationRules.minLength(8, 'Password'),
    validationRules.passwordStrength('Password'),
  ],
  confirmPassword: [
    validationRules.required('Confirm Password'),
  ],
};

// Validate signup form with password confirmation
export const validateSignupForm = (formData: Record<string, any>): ValidationResult => {
  // First validate the form against the schema
  const basicValidation = validateForm(formData, signupValidationSchema);
  
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  // Then check if passwords match
  if (formData.password !== formData.confirmPassword) {
    return {
      isValid: false,
      errors: {
        confirmPassword: ['Passwords do not match'],
      },
    };
  }

  return { isValid: true, errors: {} };
};