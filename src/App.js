import React, { useState } from 'react';
import './sass/app.css';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
		'X-RapidAPI-Key': '06678c9f50msh8e8dc3e7442f9f3p14404djsne386b9f689a7'
	}
};

function App() {
  const [names, setNames] = useState({first: getRandomName(exampleNames), second: getRandomName(exampleNames)})
  const [errorFlag, setErrorFlag] = useState(false)
  const [isMatch, setIsMatch] = useState({})
  function handleNameChange(newName, idx){
    const updatedNames = ( idx === 'first' )
      ? { ...names, first: newName }
      : { ...names, second: newName }
    setNames(updatedNames)
  }
  async function handleSubmit(e){
    e.preventDefault();
    try{
      const res = await fetch("https://love-calculator.p.rapidapi.com/getPercentage?fname=" + names.first + "&sname=" + names.second + "?X-RapidAPI-Key=", options);
      setIsMatch(await res.json())
    } catch(error) {
      setErrorFlag(true);
      console.error(error);
    }
  }

  function resetForm(){
    setIsMatch({})
    setNames({first: getRandomName(exampleNames), second: getRandomName(exampleNames)})
  }

  function getFormForNames(){
    return (
      <form onSubmit={handleSubmit} className='hold-form-fields'>
        <input type='text' placeholder={names.first} onChange={e => handleNameChange(e.target.value, 'first')} />
        <input type='text' placeholder={names.second} onChange={e => handleNameChange(e.target.value, 'second')} />
        <button>Go!</button>
      </form>
    )
  }

  return (
    <div className="app" data-result={isMatch.percentage ? calculateRankFromPercentage(parseInt(isMatch.percentage)) : "no-result"}>
      <header className='prow center'>
        <div className='intro'>
          <span className='test h1'>Test</span>
          <span className='your right h1'>Your</span>
          <span className='heart h1'>❤</span>
          <span className='love left h1'>Love</span>
        </div>
        <section className='form-or-result'>
        {isMatch.percentage
          ? <p className='result'>{`${names.first} & ${names.second} are:`}</p>
          : getFormForNames()
        }
        {errorFlag && <p>Sorry! There was an error in the Testometer</p>}
        </section>
      </header>
      <ol className='ranks'>
        {ranks.map(rank => {
          return <li key={rank} className={getClassName(rank, isMatch.percentage)}>{rank}</li>}
        )}
      </ol>
      <footer className='stern center'>
        {isMatch.percentage && <button onClick={() => resetForm()}>Try again</button>}
        <h1>Dr. Love's<br /> Love<br /> Testometer</h1>
      </footer>
    </div>
  );
}

export default App;

function getClassName(rank, hit){
  return 'rank ' + rank.toLowerCase().replace(/\s/g, '-')
}

function calculateRankFromPercentage(percentage){
  if (percentage > 90)
    return 'red-hot'
  else if (percentage > 80)
    return 'casanova'
  else if (percentage > 70)
    return 'passionate'
  else if (percentage > 60)
    return 'wild'
  else if (percentage > 50)
    return 'kissable'
  else if (percentage > 40)
    return 'mild'
  else 
    return 'cold-fish'
}

const exampleNames = ["Linda", "Bob", "Jimmy Pesto", "Jimmy Junior", "Ron", "Tina", "Louise", "Hugo", "Gretchen", "Gayle", "Mr Frond", "DRL", "Gene", "Bob Jr"]

function getRandomName(names){
  return names[Math.floor(Math.random() * names.length)]
}

const ranks = [
  'Red Hot',
  'Casanova',
  'Passionate',
  'Wild',
  'Kissable',
  'Mild',
  'Cold Fish'
]