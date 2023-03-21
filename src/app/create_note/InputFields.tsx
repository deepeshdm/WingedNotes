
import { format } from 'date-fns';
import { Divider } from '@mui/material';
import { MdDelete } from 'react-icons/md'
import { Roboto } from '@next/font/google';
const robotoFont = Roboto({ weight: '400', subsets: ['latin'] });
const robotoTitleFont = Roboto({ weight: '700', subsets: ['latin'] });

type InputProps = {
    noteData: { title: string; body: string },
    setNoteData: React.Dispatch<React.SetStateAction<{ title: string; body: string, lastUpdated: string }>>,
    setDisableUpdateButton: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleteIconClicked?: React.Dispatch<React.SetStateAction<boolean>>,
    children?: React.ReactNode
}


export const TitleInput = ({ noteData, setNoteData, children, setDisableUpdateButton, setDeleteIconClicked }: InputProps) => {

    // Delete Icon handler
    const deleteIconHandler = () => {
        // Show Dialogbox to confirm deletion 
        if (setDeleteIconClicked) {
            setDeleteIconClicked(true)
        }
    }

    // Update the state as the User types
    const OnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentDate = String(format(new Date(), 'MMM dd, h:mm aa, yyyy'))
        setNoteData({ ...noteData, title: event.target.value, lastUpdated: currentDate })
        setDisableUpdateButton(false)
    }

    return (
        <div className="flex items-center">
            <div className="flex flex-col w-[60%] sm:w-[65%] md:w-[75%] lg:w-[79%] min-[1200px]:w-[83%] xl:min-w-[83%]">
                <input onChange={OnChangeHandler} defaultValue={noteData.title}
                placeholder="Enter Title Here......"
                className={`bg-slate-800 rounded-md text-zinc-400 text-md focus:outline-none px-5 pt-3 pb-1 resize-none line-clamp-1 ${robotoTitleFont.className}`}/>
                <Divider sx={{ width: '100%', height: '1px', backgroundColor: '#a1a1aa' }} />
            </div>

            {children}
            <span className="ml-6 max-[500px]:ml-3">
                <MdDelete onClick={deleteIconHandler} className='w-9 h-10 text-red-500 hover:text-red-600 active:text-red-500' />
            </span>
        </div>
    )
}


export const NoteInput = ({ noteData, setNoteData, setDisableUpdateButton }: InputProps) => {

    // Update the state as the User types
    const OnChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentDate = String(format(new Date(), 'MMM dd, h:mm aa, yyyy'))
        setNoteData({ ...noteData, body: event.target.value, lastUpdated: currentDate })
        setDisableUpdateButton(false)
    }

    return (
        <>
            <textarea onChange={OnChangeHandler} defaultValue={noteData.body}
                placeholder="Write Something here......✍️"
                className={`bg-slate-800 rounded-md text-zinc-400 px-5 py-6 text-md focus:outline-none resize-none ${robotoFont.className}`}
                style={{ height: 'auto', minHeight: '600px' }}
            />
        </>
    )
}