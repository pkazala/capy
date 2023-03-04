import { createEffect } from "solid-js";

function Script(url) {
  createEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    /* return () => {
      document.body.removeChild(script);
    }; */
  });
}

export default Script;
