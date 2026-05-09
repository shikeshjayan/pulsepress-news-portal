const LogoutConfirmModal = () => {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Confirm Logout
          </h3>
          <p className="text-gray-500">
            Are you sure you want to log out of your account?
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm">
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoutConfirmModal;
