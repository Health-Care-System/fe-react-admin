import client from "../utils/auth";
import { handleVerifyOTPError } from "../utils/validation";

export const getOTP = async (form, setStep, handleChange) => {
  handleChange('loadingStep1', true);
  try {
    const res = await client.post('/admins/get-otp', { email: form.email });
    if (res?.status === 200) {
      setStep(2);
    }
  } catch (error) {
    console.error(error);
  } finally {
    handleChange('loadingStep1', false);
  }
}

export const verifyOTP = async (form, handleChange, setStep, setError) => {
  handleChange('loadingStep2', true);
  try {
      const requestBody = {
          email: form.email,
          otp: form.otp.join('')
      };
      const res = await client.post('/admins/verify-otp', requestBody);
      if (res?.status === 200) {
          setStep(3)
      }
  } catch (error) {
      handleVerifyOTPError(error, setError)
      handleChange('otp', ['', '', '', ''])
  } finally {
    handleChange('loadingStep2', false);
  }
};

