import Header from './components/Header'
import { useEffect, useState } from 'react'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


export default function App() {
    const [tasks, setTasks] = useState([]) //First we used db directly here
    useEffect(() => {
        const getTasks = async () => {  //async because fetchtasks returns promise
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])


    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        // console.log(data)
        return data
    }
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        // console.log(data)
        return data
    }


    const [showAddTask, setShowAddTask] = useState(false)
    const deleteTask = async (id) => {
        //delete from backend
        await fetch(`http://localhost:5000/tasks/${id}`,
            { method: 'DELETE', })
        //to delete from browser
        // console.log(`Deleted ${id}`)
        setTasks(tasks.filter((task) => task.id !== id))
    }
    // const toggleReminder =(id)=> {
    //     setTasks(tasks.map((task) => task.id === id ? {...task , reminder : !task.reminder} : task))
    // }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask),
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        )
    }

    const onAdd = async (task) => {
        //for data
        const res = await fetch('http://localhost:5000/tasks',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json' //because we are posting data
                },
                body: JSON.stringify(task)
            }
        )

        const data = await res.json()

        setTasks([...tasks, data])
        //for browser
        // const id =Math.floor(Math.random() * 10000) + 1
        // const newTask = {id,...task}
        // setTasks([...tasks,newTask])
    }
    return (
        <Router>
            <div className='container'>
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                {showAddTask && <AddTask onAdd={onAdd} />}
                                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                                    : ('No tasks to show')}
                            </>
                        }
                    />
                    <Route path='/about' element={<About />} />
                </Routes>
                <Footer />


            </div>
            </Router>
            )
}

// class App extends React.Component{
//     render(){
//         return <h1>Hello</h1>
//     }
// }