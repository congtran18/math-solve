import { useState, useRef } from "react";
import axios from "axios";
import PlotlyGraph from "./plotly";
import FadeLoader from "react-spinners/FadeLoader";

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [asciimath, setAsciimath] = useState();
  const [latex, setLatex] = useState();
  const [simplyMath, setSimplyMath] = useState();
  const [result, setResult] = useState();
  const [method, setMethod] = useState([]);
  const [stepByStepResult, setStepByStepResult] = useState();
  const iframeRef = useRef(null);
  const [isLoading, setIsloading] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(0);

  const override = {
    display: "block",
    margin: "20px auto",
    borderColor: "red",
  };

  const smartRound = (number, precision) => {
    // Kiểm tra nếu số đầu vào là nguyên,
    // thì trả về số nguyên không làm tròn
    if (Number.isInteger(number)) {
      return number;
    }

    // Sử dụng Math.pow để tính toán số nhân để làm tròn với độ chính xác nhất định
    let multiplier = Math.pow(10, precision);

    // Làm tròn số theo độ chính xác
    let roundedNumber = Math.round(number * multiplier) / multiplier;

    return roundedNumber;
  };

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setStepByStepResult(null);
    }
  };

  const handleFileUpload = async () => {
    // Create a new FormData object
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const { data } = await axios.post(
        "https://math.astraler.com/api/v1/scan-math-solve/scan-solve",
        formData
      );
      setAsciimath(data.data.asciimath);
      setLatex(data.data.latex);
      setResult(data.data.result);
      setMethod(data.data.methodSolve);
      console.log(data.data.simplyMath);
      setSimplyMath(data.data.simplyMath);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStepSolve = async (item) => {
    try {
      setIsloading(true);
      setStepByStepResult(null);
      const dataRequest = { textScan: `$${latex}$` };
      if (item) dataRequest.method = item;
      const { data } = await axios.post(
        "https://math.astraler.com/api/v1/scan-math-solve/step-by-step",
        dataRequest
      );
      setIsloading(false);
      setStepByStepResult(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <input accept="image/*" type="file" onChange={imageChange} />

        {selectedImage && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt="Thumb"
            />
          </div>
        )}
        <button
          style={styles.button}
          onClick={handleFileUpload}
          disabled={!selectedImage}
        >
          Scan Solve
        </button>
        {result && (
          <div>
            Results:{" "}
            {result
              .map((item) => {
                if (typeof item === "object")
                  return `${item.re} + ${item.im.toFixed(5)}i`;
                return smartRound(item, 5);
              })
              .map((item, index) => {
                if (index === 0) return <span> x = {item}</span>;
                return <span>, x = {item}</span>;
              })}
          </div>
        )}
        <br />
        {method.map((item) => {
          return (
            <button onClick={() => handleStepSolve(item)} style={styles.step}>
              Step Using {item}
            </button>
          );
        })}
        {result && method.length === 0 && (
          <button onClick={() => handleStepSolve(null)} style={styles.step}>
            Step By Step
          </button>
        )}
      </div>
      {isLoading && (
        <FadeLoader
          loading={isLoading}
          cssOverride={override}
          size={500}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {stepByStepResult && (
        <div style={styles.containerFram}>
          <iframe
            title="HTML Template"
            width="80%"
            ref={iframeRef}
            srcDoc={`

<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script type="text/javascript" async
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_CHTML">
    </script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\(","\)"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>

<div class="m-exercice" data-title="Exercise 1">
  <div id="exercise-1">${stepByStepResult}</div>
</div>

</body>
</html>
      `}
            onLoad={() => {
              const { current } = iframeRef;
              if (current) {
                setIframeHeight(
                  current.contentWindow?.document.body.scrollHeight
                );
              }
            }}
            style={{ height: iframeHeight, minHeight: 500 }}
          />
        </div>
      )}
      {simplyMath && <PlotlyGraph expression={simplyMath} />}
    </>
  );
};

export default Scan;

// Just some styles
const styles = {
  containerFram: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  step: {
    margin: 5,
    minWidth: 300,
  },
  button: {
    margin: 50,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
