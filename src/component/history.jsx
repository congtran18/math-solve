import React from "react";

const history = [
  {
    filePath:
      "https://math-solver-bucket.s3.us-east-1.amazonaws.com/7dc3bdc0fc2ac183c3a779b25c66460f1695926537123.png",
    result: [4],
  },
  {
    filePath:
      "https://math-solver-bucket.s3.us-east-1.amazonaws.com/0868586514f4e21a83e746d2deb438a91695927915545.png",
    result: ["-4", "-1", "-3"],
  },
  {
    filePath:
      "https://math-solver-bucket.s3.us-east-1.amazonaws.com/e6019a71963f21d861ff56927e105dc21695926621933.png",
    result: ["3 + 2.23607i", "3 + -2.23607i"],
  },
  {
    filePath:
      "https://math-solver-bucket.s3.us-east-1.amazonaws.com/afe885c458aaa0fa1902b38e9d5f71321695928768333.png",
    result: ["-0.5", "0.5", "2.333"],
  },
  {
    filePath:
      "https://math-solver-bucket.s3.us-east-1.amazonaws.com/1d131ef567d26ce2b0188d295b48dcf31695927688831.png",
    result: ["0.707", "1.333", "0.707"],
  },
];

const History = () => {
  return (
    <div>
      <h2>History</h2>
      {history.map((item) => {
        return (
          <div style={{ borderStyle: "solid", borderColor: "GrayText" , margin: 20, padding: 10 }}>
            <img src={item.filePath} style={styles.image} alt="Thumb" />
            <div>
              Result:{" "}
              {item.result.map((data, index) => {
                if (index === 0) return <span> x = {data}</span>;
                return <span>, x = {data}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;

// Just some styles
const styles = {
  image: { maxWidth: "100%", maxHeight: 200 },
};
