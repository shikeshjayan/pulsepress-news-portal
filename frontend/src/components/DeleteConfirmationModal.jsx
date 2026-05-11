// Reusable confirmation modal with customizable title and message
const DeleteConfirmationModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <section role="dialog" aria-modal="true" aria-label={title || "Confirm delete"} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {title || "Confirm Delete"}
          </h3>
          <p className="text-gray-500">
            {message || "Are you sure you want to delete this item?"}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-green-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
            Yes, Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirmationModal;
