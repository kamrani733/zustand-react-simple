import React from "react";

const Item = React.memo(({ onClick }) => {
  console.log("رندر کامپوننت Item");
  return <button onClick={onClick}>کلیک کن</button>
});

export default Item;