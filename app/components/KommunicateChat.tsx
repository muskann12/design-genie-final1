// components/KommunicateChat.tsx
"use client"; // agar aap app router use kar rahi hain

import { useEffect } from "react";

declare global {
  interface Window {
    kommunicate?: any;
  }
}

const KommunicateChat = () => {
  useEffect(() => {
    // Check agar already loaded na ho
    if (window.kommunicate) return;

    (function (d, m) {
      var kommunicateSettings = {
        appId: "18a554ced79c986e2cbf1382d6b4f76ef",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);

      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null; // UI component render nahi karta, sirf script inject karta hai
};

export default KommunicateChat;
