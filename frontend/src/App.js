import { useState, useEffect } from 'react';
import './App.css';

import moment from 'moment';

import Header from './components/Header'
import Selector from './components/Selector'
import Passage from './components/Passage/index'
import CommentCnt from './components/CommentCnt'

function App() {
  const [offset, setOffset] = useState(0);
  const [date, setDate] = useState(moment().format("MM-DD-YYYY"))
  
  useEffect(() => {
      const newDate = moment().subtract(offset, 'days').format("MM-DD-YYYY");
      setDate(newDate)
  }, [offset])
  
  const handleBackOneDay = () => {
      setOffset(offset => offset + 1);
  }

  const handleForwardOneDay = () => {
      if (offset > 0) {
          setOffset(offset => offset - 1);
      }
  }
  
  return (
    <div className="App">
      <Header />
      <Selector onBackOneDay={handleBackOneDay} onForwardOneDay={handleForwardOneDay} date={date} />
      <Passage date={date} />
      <CommentCnt date={date} />
    </div>
  );
}

export default App;
