import React from 'react';
import Curve from '../../atoms/Curve/Curve';
function CurveGraphicBg() {
  return (
    <>
      <Curve
        Size={300}
        Rotate={3}
        ScaleX={8}
        top={-180}
        left={-20}
        gradientAngle={10}
      />
      <Curve
        Size={100}
        Rotate={3}
        ScaleX={5}
        top={400}
        borderRadius={10}
        right={-80}
        style={{opacity: 0.2}}
      />
      <Curve
        Size={100}
        Rotate={3}
        ScaleX={6}
        top={300}
        borderRadius={10}
        left={-70}
        style={{opacity: 0.2}}
      />
      <Curve
        Size={200}
        Rotate={6}
        ScaleX={5}
        bottom={-80}
        left={-150}
        gradientAngle={120}
      />
    </>
  );
}

export default CurveGraphicBg;
