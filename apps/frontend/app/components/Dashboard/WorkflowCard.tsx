
const WorkflowCard = ({ title, description }: { title: string, description: string }) => {
    return <div className='flex flex-row justify-between items-center text-white bg-gray-800 p-3 rounded !bg-[#414244] border-1 border-gray-500'>
        <div className='flex flex-col'>
            <h5 className='m-0'>{title}</h5>
            <p className='text-sm m-0 text-gray-400'>{description}</p>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
        </div>

    </div>;
}

export default WorkflowCard;