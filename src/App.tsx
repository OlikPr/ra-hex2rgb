import { FormEvent, useState } from 'react'
import './App.css'
import Input  from './components/Input'


function App() {
  const [state, setState] = useState('')

  const [converter, setConverter] = useState({
    text: '',
    background: '',
    color: '',
  });

  const examString = (str : string) : boolean => {
    return /^#[0-9, A, a, B, b, C, c, D, d, e, E, F, f]{6}/.test(str);
  } 

  const toRgb = (hex: string) : string => {
    const r = hex.substring(1,3);
    const g = hex.substring(3,5);
    const b = hex.substring(4);

    return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
  }

  const debugInput = (event: FormEvent<HTMLInputElement>) : void => {
    setState((event.target as HTMLInputElement).value)

    if ((event.target as HTMLInputElement).value.length === 7) {
      if (examString((event.target as HTMLInputElement).value)) {
        setConverter({
          text: toRgb(state),
          background: toRgb(state),
          color: toRgb(state)
        });
      } else {
        setConverter({
          text: 'Ошибка',
          background: 'rgb(256, 0, 0)',
          color: 'rgb(256, 0, 0)',
        })
      }
    } 
  }

  const container = {
    background: converter.background,
    color: converter.color
  }

  return (
    <div className='container' style={container}>
        <Input value={state} placeholder={'Введите hex #ffffff'} onChange={debugInput}/>
        <div className='converter' >{converter.text}</div>
    </div>

  )
}

export default App