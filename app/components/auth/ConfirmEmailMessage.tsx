export const ConfirmEmailMessage = () => {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Check Your Email
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        We've sent you a verification email. Please check your inbox and click
        the verification link to activate your account.
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        If you don't see the email, please check your spam folder. The
        verification link will expire in 24 hours.
      </p>
    </div>
  );
};
