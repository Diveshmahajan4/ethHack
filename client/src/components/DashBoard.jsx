import React from 'react'
import Web3 from 'web3';
import Select from '../assets/tick.png'
import Monkey from '../assets/monkey.png'

const DashBoard = () => {

  const handleTransferFunds = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const loanId = 1; // Replace with the actual loan ID you want to fund
        const amountToSend = web3.utils.toWei('1', 'ether'); // Replace '1' with the amount you want to send

        const contractAddress = '0x87a3ac66ca5C9Ef5463ca604b38F6FAF81A0D59D'; // Replace with your contract address
        const contractABI = [
          // ... Your contract ABI here
          {
            "constant": false,
            "inputs": [
              {
                "name": "_loanId",
                "type": "uint256"
              }
            ],
            "name": "fundLoan",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          // ... Other ABI entries
        ];

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Call the contract function to fund the loan
        const result = await contract.methods.fundLoan(loanId).send({
          from: accounts[0],
          value: amountToSend
        });

        console.log('Transaction successful:', result);
        alert('Funds transferred successfully!');
      } catch (error) {
        console.error('Error transferring funds:', error);
        alert('Error transferring funds. Please check the console for details.');
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask and try again.');
    }
  };






  return (
    <div className="flex flex-col max-w-sm col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
        <div>
            <img src={Monkey} alt="#" className='w-full h-full object-cover'/>
        </div>
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Select} width="32" height="32" alt="Icon 01" />
        </header>
        <div className="text-xs font-semibold text-green-400 dark:text-green-500 uppercase mb-1">Accepted</div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Official Certificate</h2>
        <div className="flex items-start mb-4">
          <div className="text-2xl  text-slate-800 dark:text-slate-100 mr-2">Official certificate of passing a Qualifying Examination</div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleTransferFunds}
                >
            View
          </button>
          <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full"></div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart data={chartData} width={389} height={128} /> */}
      </div>
    </div>
  )
}

export default DashBoard