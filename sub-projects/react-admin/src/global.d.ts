declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    __webpack_public_path__?: string;
    __transition?: () => void;
  }
}

export {}
