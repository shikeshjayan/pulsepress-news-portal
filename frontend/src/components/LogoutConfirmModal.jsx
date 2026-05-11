// Small modal that asks the user to confirm before logging out
const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <section role="dialog" aria-modal="true" aria-label="Confirm logout" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Confirm Logout
          </h3>
          <p className="text-gray-500">
            Are you sure you want to log out of your account?
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400">
            Yes, Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoutConfirmModal;
