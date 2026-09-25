import API from './api';
import toast from 'react-hot-toast';

export const openResume = async (path) => {
    const tab = window.open('', '_blank');
    if (!tab) return toast.error('Allow pop-ups to view this resume');
    tab.opener = null;
    try {
        const { data } = await API.get(path);
        tab.location.replace(data.url);
    } catch (error) {
        tab.close();
        toast.error(error.response?.data?.message || 'Could not open resume');
    }
};
