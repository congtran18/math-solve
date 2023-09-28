import { useState, useRef } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import MathInput from "react-math-keyboard";
import PlotlyGraph from "./plotly";

const Calculator = () => {
  const [latex, setLatex] = useState("");
  const [asciimath, setAsciimath] = useState();
  const [simplyMath, setSimplyMath] = useState();
  const [result, setResult] = useState();
  const [method, setMethod] = useState([]);
  const [stepByStepResult, setStepByStepResult] = useState();
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(0);

  const handleStepSolve = async (item) => {
    try {
      const { data } = await axios.post(
        "https://math.astraler.com/api/v1/scan-math-solve/step-by-step",
        { textScan: `$${latex}$`, method: item }
      );
      setStepByStepResult(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSolveMath = async () => {
    try {
      const { data } = await axios.post(
        "https://math.astraler.com/api/v1/scan-math-solve/calculator",
        { text: latex }
      );
      setAsciimath(data.data.asciimath);
      setResult(data.data.result);
      setMethod(data.data.methodSolve);
      setSimplyMath(data.data.simplyMath);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
        <Container fluid>
        <h2>Calculator</h2>
        <MathInput setValue={setLatex}/>
        <button style={{ marginTop: 10, marginBottom: 10 }} onClick={handleSolveMath}>Solve</button>
        {result && (
          <div>
            Results:{" "}
            {result.map(item => {
          if (typeof item === "object")
            return `${item.re} + ${item.im.toFixed(5)}i`;
          return item;
        }).map((item, index) => {
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
            style={{ height: iframeHeight, minHeight: 400 }}
          />
        </div>
      )}
      {simplyMath && <PlotlyGraph expression={simplyMath} />}
        </Container>
    </div>
  );
};

export default Calculator;

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
