'use client';
import { Toast } from '@base-ui-components/react/toast';
import { toastManager } from '@/lib/toastManager';
import styles from './styles.module.css';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider toastManager={toastManager}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className={styles.viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className={styles.toast}>
      <Toast.Title className={styles.title} />
      <Toast.Description className={styles.description} />
      <Toast.Close className={styles.close} aria-label="Fechar" />
    </Toast.Root>
  ));
}
