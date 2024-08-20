import React from "react";

function Social({ name }: { name: string }) {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);
  return (
    <div>
      <a className="twitter-timeline" href={`https://twitter.com/${name}`}>
        Tweets by {name}
      </a>
    </div>
  );
}

export default Social;
