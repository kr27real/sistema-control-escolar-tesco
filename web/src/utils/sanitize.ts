import DOMPurify from 'dompurify';

export const sanitizeInput = (dirty: string): string => {
  return DOMPurify.sanitize(dirty.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

export const isValidMatricula = (matricula: string): boolean => {
  const regex = /^[a-zA-Z0-9]{6,13}$/;
  return regex.test(matricula.trim());
};