import React, { useEffect } from 'react';

const MathJaxComponent = ({ mathExpression }) => {
  useEffect(() => {
    // Khởi tạo MathJax
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
      },
    };

    // Load các tệp JavaScript của MathJax
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.body.appendChild(script);

    // Khi tệp JavaScript được tải xong, thực hiện lại MathJax
    script.onload = () => {
      window.MathJax.typeset();
    };
  }, [mathExpression]);

  return (
    <div>
      {/* Hiển thị công thức toán học */}
      <span>{mathExpression}</span>
    </div>
  );
};

export default MathJaxComponent;