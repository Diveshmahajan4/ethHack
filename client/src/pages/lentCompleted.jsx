import Web3 from 'web3';
const DashBoard2 = () => {
const handleTransferFunds = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const loanId = 1; // Replace with the actual loan ID you want to fund
            const amountToSend = web3.utils.toWei('1', 'ether'); // Replace '1' with the amount you want to send

            const contractAddress = '0x303622C872C3B550A35Be37577C6F5C906F5b7a9'; // Replace with your contract address
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
    }};

   return (
    <div className="flex flex-col max-w-sm col-span-full sm:col-span-6 xl:col-span-4 bg-white  dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
       
        
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleTransferFunds}
                >
                    Transfer Funds
                </button>
               
   
        

       
    </div>
);
};
export default DashBoard2;