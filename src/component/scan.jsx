import { useState, useEffect } from "react";
import axios from "axios";
import MathJax from 'react-mathjax';
import MathJaxComponent from './mathjax'

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [asciimath, setAsciimath] = useState();
  const [latex, setLatex] = useState();
  const [result, setResult] = useState();
  const [method, setMethod] = useState([]);
  const [stepByStepResult, setStepByStepResult] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    // Create a new FormData object
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
        const { data } = await axios.post("http://localhost:3005/api/v1/scan-math-solve/scan-solve", formData);
        setAsciimath(data.data.asciimath);
        setLatex(data.data.latex);
        setResult(data.data.result);
        setMethod(data.data.methodSolve);
    } catch(err) {
        console.error(err);
    }
  };

  const handleStepSolve = async (item) => {
    try {
        const { data } = await axios.post("http://localhost:3005/api/v1/scan-math-solve/step-by-step", { textScan: `$${latex}$`, method: item });
        setStepByStepResult(data.data)
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <>
            <MathJax.Provider>
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
        {latex && <MathJax.Node formula={latex} />}
        {result && <div>Results: {result.map((item, index) => {
            if (index === 0) return <span> {item}</span>
            return <span>, {item}</span>
        })}</div>}
        <br />
        {method.map((item) => {
            return <button onClick={() => handleStepSolve(item)} style={styles.step}>
                Step Using {item}
            </button>
        })}
        {stepByStepResult && <div>{stepByStepResult}</div>}
        <div>{`To solve the equation $2x^2 - 5x - 7 = 0$ step by step, we can use the quadratic formula. The quadratic formula states that for any quadratic equation $ax^2 + bx + c = 0$, the solutions for $x$ can be found using the formula: $$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$ Comparing our equation $2x^2 - 5x - 7 = 0$ to the general form $ax^2 + bx + c = 0$, we can determine that $a = 2$, $b = -5$, and $c = -7$. Step 1: Substitute the values of $a$, $b$, and $c$ into the quadratic formula. $$x = \frac{-(-5) \pm \sqrt{(-5)^2-4(2)(-7)}}{2(2)}$$ Step 2: Simplify the expression inside the square root. $$x = \frac{5 \pm \sqrt{25 + 56}}{4}$$ $$x = \frac{5 \pm \sqrt{81}}{4}$$ $$x = \frac{5 \pm 9}{4}$$ Step 3: Simplify the expression under the square root and combine the fractions. For the $+$ case: $$x = \frac{5 + 9}{4}$$ $$x = \frac{14}{4}$$ $$x = \frac{7}{2}$$ For the $-$ case: $$x = \frac{5 - 9}{4}$$ $$x = \frac{-4}{4}$$ $$x = -1$$ Therefore, the solutions to the equation $2x^2 - 5x - 7 = 0$ are $x = \frac{7}{2}$ and $x = -1$`}</div>
      </div>
      </MathJax.Provider>
    </>
  );
};

export default Scan;

// Just some styles
const styles = {
    step: {
        margin: 5,
        minWidth: 300
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
