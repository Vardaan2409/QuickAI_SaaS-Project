const Testimonial = () => {

    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            date: 'April 20, 2025',
            review: 'The AI article writer is a lifesaver — it saved me hours every week!'
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025',
            review: 'The blog title generator gives me fresh, catchy ideas instantly. Super useful!'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            date: 'June 5, 2025',
            review: 'I used the resume reviewer before applying for jobs — and got 3 interview calls!'
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Amelia Stone',
            handle: '@creativecoder',
            date: 'May 15, 2025',
            review: 'The background remover is extremely accurate. No need for Photoshop anymore!'
        },
        {
            image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Leo Fernandez',
            handle: '@leocreates',
            date: 'June 2, 2025',
            review: 'Object removal works like magic. It saved my client project last minute!'
        },
        {
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60',
            name: 'Nia Kapoor',
            handle: '@niatech',
            date: 'July 1, 2025',
            review: 'Combining AI writing with image generation gave my blog a professional edge!'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="glass-morphism p-6 rounded-[2rem] mx-4 shadow-premium hover:shadow-glow transition-all duration-300 w-80 shrink-0 border border-white/50">
            <div className="flex gap-3 items-center">
                <img className="w-12 h-12 rounded-2xl shadow-sm border border-white object-cover" src={card.image} alt="User" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-bold text-gray-900 text-sm">{card.name}</p>
                        <svg className="mt-0.5" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#3B82F6" />
                        </svg>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm py-5 text-gray-600 leading-relaxed italic">"{card.review}"</p>
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium border-t border-gray-100/50 pt-4">
                <div className="flex items-center gap-1">
                    <span>Verified Source</span>
                    <a href="https://x.com" target="_blank" className="text-primary hover:text-secondary transition-colors">
                        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <div className="py-24 overflow-hidden">
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marqueeScroll 35s linear infinite;
                }
                .marquee-reverse {
                    animation-direction: reverse;
                }
                .marquee-inner:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Heading Block */}
            <div className='text-center mb-16'>
                <h2 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
                    <span className='premium-gradient-text'>Loved by Creators</span>
                </h2>
                <p className='text-gray-500 max-w-lg mx-auto text-lg leading-relaxed'>
                    Don't just take our word for it. Join thousands of creators who've already leveled up their workflow.
                </p>
            </div>

            <div className="space-y-12">
                {/* Marquee Row 1 */}
                <div className="marquee-row w-full mx-auto overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-32 md:w-64 z-10 pointer-events-none bg-gradient-to-r from-white via-white/50 to-transparent"></div>
                    <div className="marquee-inner flex transform-gpu min-w-[200%] pb-5">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-32 md:w-64 z-10 pointer-events-none bg-gradient-to-l from-white via-white/50 to-transparent"></div>
                </div>

                {/* Marquee Row 2 (Reverse) */}
                <div className="marquee-row w-full mx-auto overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-32 md:w-64 z-10 pointer-events-none bg-gradient-to-r from-white via-white/50 to-transparent"></div>
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pb-5">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-32 md:w-64 z-10 pointer-events-none bg-gradient-to-l from-white via-white/50 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
