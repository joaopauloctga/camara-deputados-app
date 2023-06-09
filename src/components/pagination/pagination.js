import React from "react";

function Pagination({totalItems}) {
  const paginatioItems = Array.from({ length: totalItems }, (_, index) => index + 1);
  return <ul>
    {paginatioItems.map(n => <li>{n}</li>)}
  </ul>
}

export default Pagination