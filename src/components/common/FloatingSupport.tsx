"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validateForm, formatPhoneNumber } from "@/utils/validation";

const WHATSAPP_NUMBER = "905418849944"; // Configurable number

export default function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleWhatsApp = useCallback((text?: string) => {
    const message = text || "Merhaba, bilgi almak istiyorum.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errors = validateForm(formData);

      if (errors.length > 0) {
        const errorMap = errors.reduce(
          (acc, error) => ({
            ...acc,
            [error.field]: error.message,
          }),
          {}
        );
        setFormErrors(errorMap);
        return;
      }

      const whatsappMessage = `Ad: ${formData.name}\nTelefon: ${formData.phone}\nMesaj: ${formData.message}`;
      handleWhatsApp(whatsappMessage);
      setFormData({ name: "", phone: "", message: "" });
      setFormErrors({});
    },
    [formData, handleWhatsApp]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-700"
          aria-label="Destek penceresini aç"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"
              onClick={() => setIsOpen(false)}
              role="button"
              aria-label="Pencereyi kapat"
              tabIndex={0}
            />

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative flex flex-col h-[90vh] max-h-[600px]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              role="dialog"
              aria-labelledby="support-modal-title"
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                <h2
                  id="support-modal-title"
                  className="text-lg font-semibold text-gray-800 dark:text-white"
                >
                  WhatsApp Destek
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  aria-label="Pencereyi kapat"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-hidden p-4 flex flex-col">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 flex-1 flex flex-col"
                >
                  <div className="flex-1 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Adınız
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 p-2"
                        aria-invalid={!!formErrors.name}
                        aria-describedby="name-error"
                      />
                      {formErrors.name && (
                        <p
                          id="name-error"
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                        >
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Telefon
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: formatPhoneNumber(e.target.value),
                          }))
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 p-2"
                        aria-invalid={!!formErrors.phone}
                        aria-describedby="phone-error"
                      />
                      {formErrors.phone && (
                        <p
                          id="phone-error"
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                        >
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Mesajınız
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                        aria-invalid={!!formErrors.message}
                        aria-describedby="message-error"
                      />
                      {formErrors.message && (
                        <p
                          id="message-error"
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                        >
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    WhatsApp tan Devam Et
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
