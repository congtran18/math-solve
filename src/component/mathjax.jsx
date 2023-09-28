import React, { useEffect, useRef } from 'react';

const MathJaxComponent = ({ latex }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (window.MathJax) {
        console.log( window.MathJax.Hub)
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
  }, [latex]);

  return <div ref={containerRef}>{latex}</div>;
};

export default MathJaxComponent;