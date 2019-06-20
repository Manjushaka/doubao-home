import React, { useState } from 'react';
import _ from 'lodash';

function Puppy() {
  console.log('puppy');
  const [row, setRow] = useState(0);

  return (
      <div>
          <h3>我是豆包，豆包纸，包子，包纸。我唯一的爱好就是吃睡玩。最近喜欢趴玻璃门口，仰望天空。</h3>
          <div>{_.join(['aaa', 'bbb'], ' ')}</div>
      </div>
  )
}

export default Puppy;