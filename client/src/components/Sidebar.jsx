import React, { use } from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const Sidebar = ({ sidebar, setSidebar}) => {
    const {user} = useUser();
    const {signOut, openUserProfile} = useClerk();

    const navItems = [
        {to: '/ai', label: 'Dashboard', Icon: House},
        {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
        {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
        {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
        {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
        {to: '/ai/remove-object', label: 'Remove Objects', Icon: Scissors},
        {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
        {to: '/ai/community', label: 'Community', Icon: Users},
    ]

    return (
        <div className={`w-72 bg-slate-50/50 backdrop-blur-xl border-r border-gray-100 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-500 ease-in-out z-40`}>
            <div className='mt-10 w-full px-4'>
                <div className='flex flex-col items-center mb-8 px-4 py-6 rounded-3xl bg-white/40 border border-white/60 shadow-sm'>
                    <div className='relative'>
                        <img src={user.imageUrl} alt='user profile' className='w-16 h-16 rounded-2xl shadow-indigo-100 shadow-lg object-cover border-2 border-white' />
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></div>
                    </div>
                    <h1 className='mt-4 font-bold text-gray-900 text-lg tracking-tight'>{user.fullName}</h1>
                    <span className='text-[10px] uppercase font-bold tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mt-2'>
                        <Protect plan='premium' fallback='Free Member'>Premium Pro</Protect>
                    </span>
                </div>

                <div className='space-y-1.5 px-2'>
                    {navItems.map(({to, label, Icon})=>(
                        <NavLink 
                            key={to} 
                            to={to} 
                            end={to === '/ai'} 
                            onClick={()=>setSidebar(false)} 
                            className={({isActive})=>`group px-4 py-3 flex items-center gap-4 rounded-2xl transition-all duration-300 font-medium ${isActive ? 'bg-primary text-white shadow-glow translate-x-1' : 'text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm hover:translate-x-1'}`}
                        > 
                            {({ isActive })=>(
                                <>
                                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className='text-sm'>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className='w-full p-6 border-t border-gray-100'>
                <div className='flex items-center justify-between p-3 rounded-2xl bg-white/60 border border-white hover:border-indigo-100 transition-all'>
                    <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer group'>
                        <img src={user.imageUrl} alt='' className='w-9 h-9 rounded-xl shadow-sm group-hover:scale-105 transition-transform'/>
                        <div>
                            <h1 className='text-xs font-bold text-gray-900 leading-tight'>{user.firstName}</h1>
                            <p className='text-[10px] text-gray-400 font-medium'>View Profile</p>
                        </div>
                    </div>
                    <button 
                        onClick={signOut}
                        className='p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300'
                        title='Sign Out'
                    >
                        <LogOut className='w-4.5 h-4.5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
