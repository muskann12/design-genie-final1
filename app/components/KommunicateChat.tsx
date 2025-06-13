"use client";

import Script from 'next/script';

const KommunicateChat = () => {
  return (
    <Script
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d, m){
            var kommunicateSettings = 
                {"appId":"20b5a05884c771f47c6cf7f6688f49096","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
        `,
      }}
    />
  );
};

export default KommunicateChat;