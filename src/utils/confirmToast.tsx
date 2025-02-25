import { toast } from 'react-toastify';

export function confirmToast({ title, message, onConfirm }: { 
  title: string;
  message: string;
  onConfirm: () => void;
}) {
  toast(
    ({ closeToast }) => (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-red-600">{title}</h3>
        <p className="text-gray-700 mt-2">{message}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button 
            onClick={closeToast} 
            className="px-4 py-2 bg-gray-300 text-blue-600 rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button 
            onClick={() => { 
              onConfirm(); 
              closeToast();
            }} 
            className="px-4 py-2 bg-red-600 text-red-600 rounded-md hover:bg-red-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    ),
    { autoClose: false, closeOnClick: false }
  );
}
