import { CircleCheckBig, Trash2 } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";

  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "primary",

  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  const styles = {
    primary: {
      icon: <CircleCheckBig className="h-10 w-10 text-green-600" />,
      title: "text-green-700",
      button: "bg-green-600 hover:bg-green-700",
    },

    danger: {
      icon: <Trash2 className="h-10 w-10 text-red-600" />,
      title: "text-red-700",
      button: "bg-red-600 hover:bg-red-700",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex justify-center">{currentStyle.icon}</div>

        <h2
          className={`mb-2 text-center text-xl font-bold ${currentStyle.title}`}
        >
          {title}
        </h2>

        <p className="mb-6 text-text-muted">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 font-semibold text-white transition ${currentStyle.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
