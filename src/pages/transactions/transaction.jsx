import './transaction.css';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';

const Transaction = () => {
    const { user } = useContext(AuthContext);
    const { data, loading, error, reFetch } = useFetch(`/transactions/${user._id}`);
    return (
        <>
            <div className="tContainer">{data}</div>
        </>
    );
};

export default Transaction;
