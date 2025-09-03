"use client";
import { useEffect } from "react";

// Extend Window type to include kommunicate
declare global {
  interface Window {
    kommunicate: any;
  }
}

export default function KommunicateChat() {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "33c7b415c0e9380b6991e65c5049b17c0",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null; // Ye component UI render nahi karega, sirf script inject karega
}
