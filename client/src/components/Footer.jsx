import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleSubscribe = () => {
        toast('This feature is under development!')
    }

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-10 w-full mesh-background border-t border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between w-full gap-16 pb-16">
                <div className="lg:max-w-md">
                    <img className="h-10 mb-8 cursor-pointer hover:opacity-80 transition-opacity" src={assets.logo} alt="Logo" onClick={() => navigate('/')} />
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Experience the raw power of next-gen AI with Quick.ai. Transform your creative workflow with our suite of elite intelligence tools.
                    </p>
                    <div className='flex gap-4 mt-8'>
                        {/* Social Placeholders if needed */}
                    </div>
                </div>

                <div className="flex-1 flex flex-wrap gap-12 sm:gap-20 lg:justify-end">
                    <div className='min-w-[140px]'>
                        <h2 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-widest">Company</h2>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><a href="#" className='hover:text-primary transition-colors'>Home</a></li>
                            <li><a href="#" className='hover:text-primary transition-colors'>About us</a></li>
                            <li><a href="#" className='hover:text-primary transition-colors'>Contact us</a></li>
                            <li><a href="#" className='hover:text-primary transition-colors'>Privacy policy</a></li>
                        </ul>
                    </div>

                    <div className="max-w-sm">
                        <h2 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-widest">Stay Updated</h2>
                        <p className='text-gray-500 mb-6 font-medium'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                        <div className="flex items-center p-1 bg-white border border-gray-200 rounded-full shadow-sm focus-within:shadow-premium focus-within:border-primary/30 transition-all">
                            <input 
                                className="bg-transparent border-none outline-none w-full px-6 py-2 text-gray-900 placeholder:text-gray-400" 
                                type="email" 
                                placeholder='Enter your email' 
                            />
                            <button 
                                onClick={handleSubscribe} 
                                className="bg-primary text-white font-bold px-8 py-2.5 rounded-full hover:bg-secondary hover:shadow-glow transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-medium'>
                <p>Copyright 2026 © Vardaan Madhisiya. All Right Reserved.</p>
                <div className='flex gap-6'>
                    <a href='#' className='hover:text-primary transition-colors'>Terms of Service</a>
                    <a href='#' className='hover:text-primary transition-colors'>Cookie Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
