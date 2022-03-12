// Icons
import { MdDone, MdDeleteOutline } from 'react-icons/md'

export const Card = ({ task, i, onDeleteTask, onDoneTask }: any) => {
    return (
        <div key={i} className='bg-white p-6 rounded-xl shadow-md flex flex-col space-y-2'>
            <div className={`text-xl font-bold underline`}>
                {task.title}
            </div>
            <div className={`text-md ${task.mask? 'line-through':''}`}>
                {task.description}
            </div>
            <div className='flex space-x-3 justify-end items-center'>
                <button onClick={() => onDoneTask(i)} className='bg-blue-500 hover:bg-blue-600 p-2 rounded-md'>
                    <div>
                        <MdDone className='h-6 w-6 text-white' />
                    </div>
                </button>
                <button onClick={() => onDeleteTask(i)} className='bg-red-500 hover:bg-red-600 p-2 rounded-md'>
                        <MdDeleteOutline className='h-6 w-6 text-white' />
                </button>
            </div>
        </div>
    )
}
