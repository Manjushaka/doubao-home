import React, {memo, useState } from 'react';

function ScrollView({row}) {
    let [isScrollingDown, setIsScrollingDown] = useState(false);
    let [prevRow, setPrevRow] = useState(null);
    // console.log('before if', prevRow, row)
  
    if (row !== prevRow) {
      // Row changed since last render. Update isScrollingDown.
    //   console.log(prevRow, row);
      setIsScrollingDown(prevRow !== null && row > prevRow);
      setPrevRow(row);
    //   console.log(prevRow, row)
    }
    // console.log('after if', prevRow, row)
  
    return `Scrolling down: ${isScrollingDown}, ${prevRow}, ${row}`;
}

export default ScrollView;
