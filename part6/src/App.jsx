import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const styles = {
    background: '#222',
    color: 'white',
    height: '100vh',
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes()) 
  }, []) 

  return (
    <div style={styles}>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App