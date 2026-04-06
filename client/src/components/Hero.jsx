import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className='px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center mesh-background min-h-screen pt-20'>
            <div className='text-center mb-10 max-w-4xl mx-auto'>
                <h1 className='text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-bold leading-[1.1] tracking-tight text-gray-900'>
                    Create amazing <br className='hidden sm:block' /> 
                    content with <span className='premium-gradient-text'>AI tools</span>
                </h1>
                <p className='mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                    Transform your content with our suite of premium AI tools. 
                    Write articles, generate images, and enhance your workflow with the power of next-gen intelligence.
                </p>
            </div>

            <div className='flex flex-wrap justify-center gap-5'>
                <button 
                    onClick={() => navigate('/ai')} 
                    className='bg-primary text-white px-12 py-4 rounded-full text-lg font-semibold shadow-premium hover:bg-secondary hover:shadow-glow hover:-translate-y-1 transition-all duration-300 active:scale-95 cursor-pointer'
                >
                    Start creating now
                </button>
            </div>

            <div className='flex items-center gap-4 mt-16 mx-auto px-6 py-2 rounded-full glass-morphism shadow-sm border border-white/50 text-gray-500 text-sm font-medium'>
                <img src={assets.user_group} alt='trusted users' className='h-7 grayscale opacity-70'/>
                <span>Trusted by <span className='text-gray-900 font-bold'>10k+</span> creators worldwide</span>
            </div>
        </div>
    )
}

export default Hero
