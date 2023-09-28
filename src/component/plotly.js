import React, { useEffect, useRef } from 'react';
import * as Plotly from 'plotly.js-dist';
import * as math from 'mathjs';

const PlotlyGraph = ({ expression }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    const x = math.range(-10, 10, 0.1).toArray();
    const y = x.map((value) => math.evaluate(expression, { x: value }));
    
    const data = [{
      x,
      y,
      type: 'scatter',
      mode: 'lines',
    }];

    const layout = {
      title: expression,
      xaxis: { title: 'x' },
      yaxis: { title: 'y' },
    };

    Plotly.newPlot(graphRef.current, data, layout);
  }, [expression]);

  return <div ref={graphRef} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%" }} />;
};

export default PlotlyGraph;