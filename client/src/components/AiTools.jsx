import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';
const AiTools = () => {
    const navigate = useNavigate();
    const {user} = useUser();

    return (
        <div className='px-4 sm:px-20 xl:px-32 my-32'>
            <div className='text-center mb-16'>
                <h2 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
                    <span className='premium-gradient-text'>Powerful AI Tools</span>
                </h2>
                <p className='text-gray-600 max-w-xl mx-auto text-lg leading-relaxed'>
                    Everything you need to create, enhance, and optimize your content with cutting-edge AI technology at your fingertips.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                {AiToolsData.map((tool, index)=>(
                    <div 
                        key={index} 
                        className='glass-morphism p-10 rounded-[2.5rem] shadow-premium hover:-translate-y-2 hover:shadow-glow transition-all duration-500 cursor-pointer group flex flex-col items-center text-center'
                        onClick={()=>user && navigate(tool.path)}
                    >
                        <div 
                            className='w-20 h-20 flex items-center justify-center rounded-3xl shadow-lg transform group-hover:rotate-6 transition-transform duration-500'
                            style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` || 'var(--color-primary)'}}
                        >
                            <tool.Icon className='w-10 h-10 text-white drop-shadow-md' />
                        </div>
                        <h3 className='mt-8 mb-4 text-2xl font-bold text-gray-900'>{tool.title}</h3>
                        <p className='text-gray-600 text-base leading-relaxed'>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTools
