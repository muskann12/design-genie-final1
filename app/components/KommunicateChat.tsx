"use client";
import { useEffect } from "react";

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
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }, []);

  return null; // ye component sirf script inject karega, UI return nahi karega
}
