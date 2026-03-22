import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const handleSubscribe = () => {
        toast(t('footer.devToast'))
    }

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img className="h-9" src={assets.logo} alt="Logo" />
                        <p className="mt-6 text-sm">
                            {t('footer.tagline')}
                        </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">{t('footer.company')}</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">{t('footer.links.home')}</a></li>
                            <li><a href="#">{t('footer.links.about')}</a></li>
                            <li><a href="#">{t('footer.links.contact')}</a></li>
                            <li><a href="#">{t('footer.links.privacy')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-5">{t('footer.subscribeTitle')}</h2>
                        <div className="text-sm space-y-2">
                            <p>{t('footer.subscribeText')}</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder={t('footer.emailPlaceholder')} />
                                    <button onClick={handleSubscribe} className="bg-primary w-24 h-9 text-white rounded cursor-pointer">{t('footer.subscribeButton')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                {t('footer.copyright')}
            </p>
        </footer>
    )
}

export default Footer
