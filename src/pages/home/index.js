import React, { useState } from 'react';
// import _ from 'lodash';

function Home() {
  console.log('home');
  const [row, setRow] = useState(0);

  return (
      <div>
          <h1>home</h1>
          <h2>你好，这里是豆包之家。一只可爱的柯基妹妹和她的爸爸妈妈们.</h2>
      </div>
  )
}

export default Home;