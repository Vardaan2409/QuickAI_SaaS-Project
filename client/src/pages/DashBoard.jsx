import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const DashBoard = () => {

    const [creations, setCreations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get("/api/user/get-user-creations", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setCreations(data.creations);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return (
        <div className='h-full overflow-y-auto p-8 mesh-background'>
            <div className='flex justify-start gap-6 flex-wrap mb-12'>
                {/* Total Creation card  */}
                <div className='flex justify-between items-center w-80 p-6 glass-morphism rounded-3xl shadow-premium hover:shadow-glow transition-all duration-300 group'>
                    <div>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Total Creations</p>
                        <h2 className='text-3xl font-bold text-gray-900'>{creations.length}</h2>
                    </div>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex justify-center items-center shadow-lg group-hover:rotate-6 transition-transform'>
                        <Sparkles className='w-7 h-7 text-white' />
                    </div>
                </div>

                {/* Active Plan card  */}
                <div className='flex justify-between items-center w-80 p-6 glass-morphism rounded-3xl shadow-premium hover:shadow-glow transition-all duration-300 group' >
                    <div>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Current Tier</p>
                        <h2 className='text-3xl font-bold premium-gradient-text'>
                            <Protect plan="premium" fallback='Free Tier'>Premium Pro</Protect>
                        </h2>
                    </div>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center shadow-lg group-hover:rotate-6 transition-transform'>
                        <Gem className='w-7 h-7 text-white' />
                    </div>
                </div>
            </div>

            <div className='max-w-6xl'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-2 h-8 bg-primary rounded-full'></div>
                    <h2 className='text-2xl font-bold text-gray-900'>Recent Activity</h2>
                </div>
                
                {
                    loading ? 
                    (
                        <div className='flex justify-center items-center h-64'>
                            <div className='relative'>
                                <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary shadow-glow'></div>
                                <div className='absolute inset-0 m-auto h-8 w-8 bg-primary/10 rounded-full animate-pulse'></div>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <div className='space-y-4'>
                            {
                                creations.length > 0 ? (
                                    creations.map((item) => <CreationItem key={item.id} item={item} />)
                                ) : (
                                    <div className='p-12 text-center glass-morphism rounded-3xl border-dashed border-2 border-gray-200'>
                                        <p className='text-gray-400 font-medium'>No creations yet. Start your first project above!</p>
                                    </div>
                                )
                            }
                        </div >
                    )
                }
            </div>
        </div >
    )
}

export default DashBoard
