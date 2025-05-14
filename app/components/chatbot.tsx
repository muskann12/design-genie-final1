import { useEffect } from "react";

// 👇 Ye part TypeScript ko batata hai ke window.kommunicate exist karta hai
declare global {
  interface Window {
    kommunicate?: any;
  }
}

const KommunicateChat = () => {
  useEffect(() => {
    (function (d, m) {
      const kommunicateSettings = {
        appId: "18a554ced79c986e2cbf1382d6b4f76ef",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      const h = document.getElementsByTagName("head")[0];
      h.appendChild(s);

      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null;
};

export default KommunicateChat;