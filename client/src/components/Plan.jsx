import { PricingTable } from '@clerk/clerk-react';
const Plan = () => {
    return (
        <div className='max-w-5xl mx-auto z-20 my-40 px-4'>
            <div className="text-center mb-16">
                <h2 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
                    <span className='premium-gradient-text'>Flexible Pricing Plans</span>
                </h2>
                <p className='text-gray-600 max-w-xl mx-auto text-lg leading-relaxed'>
                    Start for free and scale up as you grow. Our transparent pricing ensures you only pay for the value you receive.
                </p>
            </div>

            <div className='mt-10 overflow-hidden rounded-3xl shadow-premium border border-white/50 glass-morphism p-4 sm:p-10'>
                <PricingTable />
            </div>
        </div>
    )
}

export default Plan
