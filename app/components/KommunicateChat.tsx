"use client";

import Script from "next/script";

const KommunicateChat = () => {
  return (
    <>
      <Script
        id="kommunicate-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d, m){
                var kommunicateSettings = 
                    {"appId":"33ff3567a177b27e873a16b764ac77f67","popupWidget":true,"automaticChatOpenOnNavigation":true};
                var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
                s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
                var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
                window.kommunicate = m; m._globals = kommunicateSettings;
            })(document, window.kommunicate || {});
          `,
        }}
      />
    </>
  );
};

export default KommunicateChat;
