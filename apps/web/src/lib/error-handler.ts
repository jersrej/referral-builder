import axios from 'axios';

/**
 * for extracting the error message
 * @param error
 * @param fallbackMessage
 * @returns
 */
export const getErrorMessage = (error: Error, fallbackMessage: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage;
  }
  return fallbackMessage;
};
