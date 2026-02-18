import { type ReactNode, useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-3xl'
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' as const }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' as const }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: 'easeIn' as const }
  }
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true
}: Props) => {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Focus trap
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleTab);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTab);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => closeOnOverlayClick && onClose()}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={clsx(
              'relative bg-white rounded-2xl shadow-2xl w-full max-h-[92vh] flex flex-col',
              sizeStyles[size]
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 shrink-0">
              {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-6 py-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
