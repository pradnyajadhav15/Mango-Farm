import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(url, r) {
      if (r) setInterval(() => r.update(), 60 * 60 * 1000);
    },
  });

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstallEvent(null));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!installEvent) return;
    installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  if (needRefresh) {
    return (
      <div className="fixed bottom-24 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
        <p className="text-sm font-medium text-gray-800">A new version of the site is available.</p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => updateServiceWorker(true)}
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
          >
            Refresh
          </button>
          <button
            onClick={() => setNeedRefresh(false)}
            className="rounded-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Later
          </button>
        </div>
      </div>
    );
  }

  if (!installEvent || dismissed) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 flex w-[92%] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
      <img src="/icons/pwa-192.png" alt="" className="h-11 w-11 rounded-xl" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">Install Mango Farm</p>
        <p className="text-xs text-gray-500">Order faster, works offline</p>
      </div>
      <button
        onClick={install}
        className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
      >
        Install
      </button>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="px-1 text-xl leading-none text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
    </div>
  );
}