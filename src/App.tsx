import { FormEvent, useState } from 'react'
import './App.css'
import Input from './components/Input'

function App() {
  const [state, setState] = useState('')

  const [converter, setConverter] = useState({
    text: '',
    background: '',
    color: '',
  })

  const examString = (str: string): boolean => {
    return /^#[0-9A-Fa-f]{6}$/.test(str)
  } 

  const toRgb = (hex: string): string => {
    const r = hex.substring(1, 3)
    const g = hex.substring(3, 5)
    const b = hex.substring(5, 7)
    return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`
  }

  const debugInput = (event: FormEvent<HTMLInputElement>): void => {
    let inputValue = (event.target as HTMLInputElement).value


    if (inputValue.length > 7) {
      inputValue = inputValue.substring(0, 7)
    }

    setState(inputValue)

    if (inputValue.length === 7) {
      if (examString(inputValue)) {
        setConverter({
          text: toRgb(inputValue),
          background: inputValue,
          color: '#000000'
        })
      } else {
        setConverter({
          text: 'Ошибка!',
          background: 'rgb(255, 0, 0)',
          color: '#ffffff'
        })
      }
    } else {
      setConverter({
        text: '',
        background: '',
        color: ''
      })
    }
  }

  const container = {
    backgroundColor: converter.background,
    color: converter.color
  }

  return (
    <div className='container' style={container}>
      <Input value={state} placeholder={'Введите hex #ffffff'} onChange={debugInput}/>
      <div className='converter'>{converter.text}</div>
      </div>
  )
}

export default App
