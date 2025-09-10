import React from 'react'
import Singup from '~/routes/signup'
import N8nlogo from './N8nlogo'
import SecondaryButton from './Button/SecondaryButton'
import { useNavigate } from 'react-router'
import PrimaryButton from './Button/PrimaryButton'

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className='flex justify-between items-center p-4 text-gray-300 border-b border-white/10 w-full fixed'>
            <div className='flex space-x-10 text-grey'>
                <div>
                    <N8nlogo />
                </div>
                <div>
                    Product
                </div>
                <div>
                    Use cases
                </div>
                <div>
                    Docs
                </div>
                <div>
                    Community
                </div>
                <div>
                    Enterprise
                </div>
                <div>
                    Pricing
                </div>
            </div>
            <div className='flex space-x-10'>
                <div>
                    <PrimaryButton label="Sign in" onClick={() => navigate("/signin")} />
                </div>
                <div>
                    <SecondaryButton label="Get started" onClick={() => navigate("/signup")} />
                </div>
            </div>
        </div>
    )
}

export default Navbar