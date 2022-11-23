import React, { useEffect, useReducer, useState } from 'react';
import './App.scss';
import { Action, ActionTypes, State, Task } from './types/types';
import TaskList from './components/TasksList/TasksList'
import AddTaskForm from './components/AddTaskForm/AddTaskForm';

import { firestore } from './firebase'
import { addDoc, collection, getDocs } from '@firebase/firestore';


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        value: [...state.value, action.payload.value]
      }
    case ActionTypes.DELETE:
      return {
        value: state.value.filter((item) => item !== action.payload.value)
      }
    case ActionTypes.UPDATE:
      return {
        value: state.value.map((item) => {
          if (item === action.payload.value)
            item = action.payload.updateValue ?? item;
          return item;
        })
      }
    default: {
      return state;
    }
  }
}

function App() {


  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, { value: [] });
  const ref = collection(firestore, 'tasks');

  useEffect(() => {

    getDocs(ref)
      .then((querySnapshot) => {
        console.log(querySnapshot.docs[0].data())
        querySnapshot.docs[0].data().tasks.map((item: Task) => {
          dispatch({
            type: ActionTypes.ADD, payload: {
              value: item
            }
          })
        });
      })

    const closePopup = (e: MouseEvent) => {
      setShowPopup(false);
    }

    const popup = document.getElementById('popup-background');
    popup?.addEventListener('click', closePopup);

    return () => {
      popup?.removeEventListener('click', closePopup);
    }
  }, [])

  useEffect(() => {
    if (state.value.length !== 0)
      autoSave(state.value);
  }, [state])

  async function autoSave(tasks: Task[]) {
    try {
      addDoc(ref, { tasks })
    } catch (e) {
      console.log(e)
    }
  }

  function addNewTask(task: Task) {
    dispatch({
      type: ActionTypes.ADD, payload: {
        value: task
      }
    })
  }

  function deleteTask(task: Task) {
    dispatch({
      type: ActionTypes.DELETE, payload: {
        value: task
      }
    })
  }

  function updateTask(task: Task, value: Task) {
    dispatch({
      type: ActionTypes.UPDATE,
      payload: {
        value: task,
        updateValue: value,
      }
    })
  }

  return (
    <div className="App">
      <TaskList list={state.value} onDeleteClick={deleteTask} updateTask={updateTask} />
      <button
        className='add-task-button'
        onClick={() => setShowPopup(true)}
      >
        <img src={require('./assets/add-icon.svg').default} />
      </button>
      <div
        id='popup-background'
        className={['popup-background', (showPopup) ? 'active' : ''].join(' ')}
        onSubmit={(e) => {
          setShowPopup(false);
        }}
      >
        <AddTaskForm addNewTask={addNewTask} />
      </div>
    </div>
  );
}

export default App;
