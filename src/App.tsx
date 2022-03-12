import { useState, useEffect } from 'react'

// Components
import { Form } from './components/form/Form';
import { Card } from './components/card/Card';

// Models
import { Task } from './models/task.model';

export const App = () => {

  // General state
  const [tasks, setTasks] = useState<Task[]>([])

  const onDeleteTask = (i: number): void => {
    if(window.confirm("Are you sure to delete?")) {
      const newTask = [...tasks]
      newTask.splice(i, 1)
      setTasks(newTask)
    }
  }

  const onDoneTask = (i: number): void => {
    const newTask = [...tasks];
    newTask[i].mask = !newTask[i].mask
    setTasks(newTask)
  }

  useEffect(() => {
    // Get tasks from local storage
    const localTasks = localStorage.getItem("tasks")
    if(localTasks) {
      setTasks(JSON.parse(localTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="App">
      <div className='max-w-5xl mx-auto py-6'>
        <div className='flex flex-col space-y-6'>
          <Form props={(value: Task) => setTasks([...tasks, value])}/>
          {/* Tasks Lists */}
          {tasks.length > 0 &&
            tasks.map((task, i) => {
              return (
                <Card task={task} i={i} onDeleteTask={onDeleteTask} onDoneTask={onDoneTask}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
