import './transaction.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../context/AuthContext';
import useFetch from '../../hook/useFetch';

const Transaction = () => {
    const { user } = useContext(AuthContext);
    const { data, loading, error, reFetch } = useFetch(`/transaction/${user._id}`);
    const [transaction, setTransaction] = useState([data]);
    console.log(data);
    useEffect(() => {
        setTransaction(data);
    }, [data]);

    return (
        <>
            <div className="tContainer">
                {loading
                    ? 'loading'
                    : transaction.map((item) => {
                          console.log(item);
                          return (
                              <div className="tContent">
                                  <table>
                                      <thead>
                                          <th>STT</th>
                                          <th>Hotel</th>
                                          <th>Room</th>
                                          <th>Dates</th>
                                          <th>Price</th>
                                          <th>Payment</th>
                                          <th>Status</th>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td></td>
                                              <td>{item.hotels.map((hotel) => hotel.name)}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          );
                      })}
            </div>
        </>
    );
};

export default Transaction;
