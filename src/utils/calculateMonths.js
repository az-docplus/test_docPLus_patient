const calculateMonths = (monthIndex) => {
  let date = new Date();
  let year = date.getFullYear();
  let arr = [];
  let d = new Date(year, monthIndex, 1);
  for (let j = 0; j < d.getDay(); j++) {
    arr.push({ day: '', date: '', month: '' });
  }
  for (let i = 0; i < 31; i++) {
    let d = new Date(year, monthIndex, i + 1);
    if (d.getMonth() === monthIndex) {
      arr.push({ day: d.getDay(), date: d.getDate(), month: d.getMonth() });
    } else {
      break;
    }
  }
  return arr;
};

export default calculateMonths;
