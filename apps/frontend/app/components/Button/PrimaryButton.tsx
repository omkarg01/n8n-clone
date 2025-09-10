import React from 'react'

const PrimaryButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
    return (
        <button onClick={onClick} className='bg-[#160F21] text-sm py-2 px-5 rounded-xl border-1 border-white cursor-pointer hover:text-white hover:font-semibold'>{label}</button>
    )
}

export default PrimaryButton