import { PricingTable } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';

const Plan = () => {
    const { t } = useTranslation();

    return (
        <div className='max-w-2xl mx-auto z-20 my-30'>
            <div className="text-center">
                <h2 className='text-slate-700 text-[42px] 
                font-semibold'>{t('plan.title')}</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>{t('plan.description')}</p>
            </div>

            <div className='mt-14 max-sm:mx-8'>
                <PricingTable />
            </div>
        </div>
    )
}

export default Plan
