import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'>
            <img src={assets.logo} alt='logo' className='w-32 sm:w-44 cursor-pointer' onClick={()=>navigate('/')} />

            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200'>
                    <Languages className='w-4 h-4 text-gray-600' />
                    <select 
                        onChange={changeLanguage} 
                        value={i18n.language}
                        className='bg-transparent text-sm outline-none cursor-pointer text-gray-700 font-medium'
                    >
                        <option value="en">EN</option>
                        <option value="es">ES</option>
                        <option value="hi">HI</option>
                    </select>
                </div>

                {
                    user ? <UserButton />
                    : 
                    (
                        <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 whitespace-nowrap'>{t('navbar.getStarted')} <ArrowRight className='w-4 h-4'/></button>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
