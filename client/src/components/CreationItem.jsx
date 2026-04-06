import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div 
            onClick={()=> setExpanded(!expanded)} 
            className={`transition-all duration-300 glass-morphism rounded-[2rem] cursor-pointer overflow-hidden group ${expanded ? 'p-8 shadow-premium' : 'p-6 shadow-sm hover:shadow-premium hover:-translate-y-1'}`}
        >
            <div className='flex justify-between items-center gap-6'>
                <div className='flex-1'>
                    <h2 className='text-gray-900 font-bold text-lg leading-tight group-hover:text-primary transition-colors'>{item.prompt}</h2>
                    <p className='text-gray-400 text-xs font-semibold mt-1 uppercase tracking-widest'>
                        {new Date(item.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-500 border border-indigo-100'>
                        {item.type}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex justify-center items-center bg-gray-50 text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180 bg-primary/10 text-primary' : ''}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>

            {
                expanded && (
                    <div className='mt-8 pt-8 border-t border-gray-100/50 animate-in fade-in slide-in-from-top-4 duration-500'>
                        {item.type === 'image' ? (
                            <div className='flex justify-center'>
                                <img 
                                    src={item.content} 
                                    alt='generated creation' 
                                    className='w-full max-w-2xl rounded-3xl shadow-premium border-4 border-white'
                                />
                            </div>
                        ) : (
                            <div className='max-w-4xl mx-auto'>
                                <div className='prose prose-sm max-w-none text-gray-600 leading-relaxed'>
                                    <div className='reset-tw bg-white/40 p-8 rounded-3xl border border-white/60'>
                                        <Markdown>{item.content}</Markdown>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CreationItem
