import React, {Children} from 'react';
import FluidAnimation from './FluidAnimation';
export default function AnimationQueue({
  children,
  delay = 100,
  ty = -25,
  tx = -25,
  scale = 1,
  opacity = 0,
}) {
  return Children.map(children, (c, index) => {
    return (
      <FluidAnimation
        ty={ty}
        tx={tx}
        scale={scale}
        opacity={opacity}
        delay={index * delay}>
        {c}
      </FluidAnimation>
    );
  });
}
