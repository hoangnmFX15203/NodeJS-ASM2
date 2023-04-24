import './transaction.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../context/AuthContext';
import useFetch from '../../hook/useFetch';
import moment from 'moment';

const Transaction = () => {
    const { user } = useContext(AuthContext);
    const { data, loading, error, reFetch } = useFetch(`/transaction/${user._id}`);

    return (
        <>
            <div className="tContainer">
                {loading
                    ? 'loading'
                    : data.map((item, index) => {
                          const startDate = moment(item.dateStart).format('DD/MM/YYYY');
                          const endDate = moment(item.endDate).format('DD/MM/YYYY');
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
                                          <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>{item.hotel}</td>
                                              <td>{item.rooms.join(',')}</td>
                                              <td>
                                                  {startDate} - {endDate}
                                              </td>
                                              <td>{item.price}</td>
                                              <td>{item.payment ? item.payment : 'cash'}</td>
                                              <td>{item.status}</td>
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
