import { useEffect } from "react";
import { useAuth, useLocalStorage } from '../hooks';
import axios from '../api/axios';

const TRANSACTIONS_URL = '/users/getTransactions';


const Box = ({accountNumber = 'N/A', date = 'N/A', amount= 'N/A', type= 'N/A'}) =>{
  var isNegative = false;
  if(type === 0) isNegative = true;
  return (
  <>
    <div className="rounded-xl drop-shadow-lg bg-white p-4 my-2 flex flex-row text-gray-bnk-100">
      <div className="flex flex-col m-auto lg:flex-row truncate">
        <p className="lg:mr-16 font-bold text-gray-bnk-200 truncate">{accountNumber}</p>
        <p className="">{date}</p>
      </div>
      <div className="flex flex-col m-auto lg:flex-row ">
        <p className={isNegative ? "truncate font-bold text-red-400": "truncate font-bold text-green-bnk-200"}>{isNegative ? '- ' : '+ '}{amount}</p>
        {/* <p className="truncate">{type}</p> */}
      </div>
    </div>
  </>
)}

const Movements = () =>{
  const { auth } = useAuth();

  const [transactions, setTransactions] = useLocalStorage('transactions',[]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.post(TRANSACTIONS_URL,
        { userId: auth.userId },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth.accessToken
          }
        }
      );
      // console.log(response?.data?.transactions);
      setTransactions(response?.data?.transactions);
      console.log(transactions);

    } catch (err) {
      console.log('Transactions could not be obtained');
    }
  }

  useEffect(() => {
    (async () => {
      await fetchTransactions();
    })();
  });

  return (
    <>
      <p className="ml-4 font-regular text-xl md:text-2xl text-gray-bnk-200 duration-200 flex">Movements</p>
      <div className="flex flex-col flex-grow p-2 pt-4 h-screen overflow-auto overscroll-contain">
        {transactions.map(t => <Box accountNumber={t.address} date={t.date} amount={t.amount} type={t.type}/>)}
      </div>
    </>
    
  )
}

export default Movements