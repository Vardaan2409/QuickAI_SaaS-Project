import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Languages, ChevronDown, Check } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const languages = [
    // Indian Languages
    { code: 'hi', name: 'हिन्दी', group: 'Indian' },
    { code: 'bn', name: 'বাংলা', group: 'Indian' },
    { code: 'te', name: 'తెలుగు', group: 'Indian' },
    { code: 'mr', name: 'मराठी', group: 'Indian' },
    { code: 'ta', name: 'தமிழ்', group: 'Indian' },
    { code: 'gu', name: 'ગુજરાતી', group: 'Indian' },
    { code: 'kn', name: 'ಕನ್ನಡ', group: 'Indian' },
    { code: 'ml', name: 'മലയാളം', group: 'Indian' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', group: 'Indian' },
    { code: 'ur', name: 'اردو', group: 'Indian' },
    { code: 'or', name: 'ଓଡ଼ିଆ', group: 'Indian' },
    { code: 'as', name: 'অসমীয়া', group: 'Indian' },
    { code: 'sa', name: 'संस्कृतम्', group: 'Indian' },
    { code: 'ks', name: 'کأشُر', group: 'Indian' },
    { code: 'sd', name: 'سنڌي', group: 'Indian' },
    { code: 'mai', name: 'मैथिली', group: 'Indian' },
    { code: 'doi', name: 'डोगरी', group: 'Indian' },
    { code: 'gom', name: 'कोंकणी', group: 'Indian' },
    { code: 'brx', name: 'बोड़ो', group: 'Indian' },
    
    // International
    { code: 'en', name: 'English', group: 'International' },
    { code: 'es', name: 'Español', group: 'International' },
    { code: 'fr', name: 'Français', group: 'International' },
    { code: 'de', name: 'Deutsch', group: 'International' },
    { code: 'zh-CN', name: '简体中文', group: 'International' },
    { code: 'ja', name: '日本語', group: 'International' },
    { code: 'pt', name: 'Português', group: 'International' },
    { code: 'ru', name: 'Русский', group: 'International' },
    { code: 'ko', name: '한국어', group: 'International' },
];

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        // Define the global initialization function
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { 
                    pageLanguage: 'en', 
                }, 
                'google_translate_element'
            );
        };

        // Shield: Force-hide the Google banner if it appears
        const hideGoogleBanner = () => {
            const selectors = [
                'iframe.goog-te-banner-frame',
                '.goog-te-banner-frame',
                '.skiptranslate iframe',
                '#goog-gt-tt',
                'iframe[id*="goog-te-banner-frame"]'
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                });
            });

            document.body.style.top = '0px';
            document.body.style.marginTop = '0px';
            document.documentElement.style.marginTop = '0px';
        };

        // Run the shield frequently during initial load and setup
        const shieldInterval = setInterval(hideGoogleBanner, 200);

        // Create and append the script tag dynamically
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            delete window.googleTranslateElementInit;
            clearInterval(shieldInterval);
        };
    }, []);

    const changeLanguage = (langCode) => {
        // Fallback: Set the official Google Translate cookie
        // Format is /from/to
        document.cookie = `googtrans=/en/${langCode}; path=/`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
        
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
            setCurrentLang(langCode);
            setIsOpen(false);
        } else {
            // If select box isn't found, reload to force translation via cookie
            window.location.reload();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync with Google Translate on load/change
    useEffect(() => {
        const interval = setInterval(() => {
            const select = document.querySelector('.goog-te-combo');
            if (select && select.value) {
                if (select.value !== currentLang) {
                    setCurrentLang(select.value);
                }
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [currentLang]);

    const selectedLangName = languages.find(l => l.code === currentLang)?.name || 'Language';

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-200 transition-all cursor-pointer text-gray-700 font-medium text-sm"
            >
                <Languages className="w-4 h-4 text-primary" />
                <span className="notranslate hidden sm:inline">{selectedLangName}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-10 py-2 max-h-[32rem] overflow-y-auto animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                        Indian Languages
                    </div>
                    {languages.filter(l => l.group === 'Indian').map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`notranslate w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${currentLang === lang.code ? 'text-primary font-semibold' : 'text-gray-600'}`}
                        >
                            {lang.name}
                            {currentLang === lang.code && <Check className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                    
                    <div className="mx-2 my-2 border-t border-gray-100"></div>
                    
                    <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                        International
                    </div>
                    {languages.filter(l => l.group === 'International').map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`notranslate w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${currentLang === lang.code ? 'text-primary font-semibold' : 'text-gray-600'}`}
                        >
                            {lang.name}
                            {currentLang === lang.code && <Check className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            )}
            {/* Hidden Google Translate Element */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
        </div>
    );
};

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <div className='fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl px-6 py-3 glass-morphism rounded-[2rem] shadow-premium flex justify-between items-center transition-all duration-300'>
            <div className='flex items-center gap-8'>
                <img 
                    src={assets.logo} 
                    alt='logo' 
                    className='w-32 sm:w-40 cursor-pointer hover:opacity-80 transition-opacity' 
                    onClick={() => navigate('/')} 
                />
            </div>

            <div className='flex items-center gap-4 sm:gap-6'>
                <LanguageSwitcher />

                {
                    user ? <div className='p-1 border border-gray-100 rounded-full bg-white/50 shadow-sm'><UserButton /></div>
                        :
                        (
                            <button 
                                onClick={openSignIn} 
                                className='flex items-center gap-2 rounded-full text-sm font-semibold cursor-pointer bg-primary text-white px-6 sm:px-8 py-2.5 whitespace-nowrap hover:bg-secondary hover:shadow-glow hover:-translate-y-0.5 transition-all active:scale-95'
                            >
                                Get Started <ArrowRight className='w-4 h-4' />
                            </button>
                        )
                }
            </div>
        </div>
    )
}

export default Navbar
