import React, { useEffect, useState } from 'react'

// Icons
import { MdOutlineSubtitles } from 'react-icons/md'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'

// Interface
import { Task } from '../../models/task.model'

export const Form = ({ props }: any) => {

    // General state
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [error, setError] = useState<string>("")

    const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if(!title || !description) {
            setError("error, please do not let field to be an empty.")
        } else {
            setError("")
            const newTask: Task = {
                title,
                description,
                mask: false
            }
            
            setTitle("")
            setDescription("")
            props(newTask)
        }
    }

    useEffect(() => {
        // Get title from local storage
        const localTitle = localStorage.getItem("title")
        if(localTitle) {
          setTitle(localTitle)
        }

        // Get description from local storage
        const localDescription = localStorage.getItem("description")
        if(localDescription) {
            setDescription(localDescription)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("title", title)
    }, [title])
    
    useEffect(() => {
        localStorage.setItem("description", description)
    }, [description])

    return (
        <form onSubmit={onSubmitHandle} className='flex flex-col space-y-8 p-6 shadow-md rounded-xl bg-white'>
            {/* Title */}
            <div className='flex space-x-3'>
                <div>
                    <MdOutlineSubtitles className='h-8 w-8'/>
                </div>
                <label className='text-2xl font-bold'>Rayato's Task Management App</label>
            </div>
            <div className='flex flex-col space-y-4'>
                {/* Title */}
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='px-4 py-2 border-2 border-gray-400 focus:outline-none focus:border-black w-full rounded-xl' type="text" placeholder='Enter your title' />
                </div>
                {/* Description */}
                <div>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className='px-4 py-2 border-2 border-gray-400 focus:outline-none focus:border-black w-full rounded-xl' type="text" placeholder='Enter your description' />
                </div>
                {error &&
                    <div className='flex space-x-2 items-center text-red-500 text-md'>
                        <div>
                            <BiErrorCircle className='h-6 w-6'/>
                        </div>
                        <div>
                            {error}
                        </div>
                    </div>
                }
            </div>
            <button type='submit' className='bg-rose-500 hover:bg-rose-600 p-2 rounded-xl'>
                <div className='flex justify-center space-x-3 items-center'>
                    <div>
                        <AiOutlineFileAdd className='h-7 w-7 text-white'/>
                    </div>
                    <div className='text-xl font-bold text-white'>
                        Add Task
                    </div>
                </div>
            </button>
        </form>
    )
}
