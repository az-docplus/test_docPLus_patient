export const hextorgba = (color, alpha = 1) => {
  if (/^#/.test(color) && (color.length === 7 || color.length === 4)) {
    const hex = color.slice(1);
    let col = [];
    if (color.length === 7) {
      col[0] = parseInt(hex.slice(0, 2), 16);
      col[1] = parseInt(hex.slice(2, 4), 16);
      col[2] = parseInt(hex.slice(4), 16);
    } else {
      col[0] = parseInt(hex.slice(0, 1), 16);
      col[1] = parseInt(hex.slice(1, 2), 16);
      col[2] = parseInt(hex.slice(2), 16);
    }
    return `rgba(${col},${alpha})`;
  } else return color;
};
