import axios from "axios"
import { useState } from "react"
import { getError } from "../../utils"
import { ApiError } from "../types/ApiError"
import { Transaction } from "../types/Transaction"

export default function Wallet() {
  const [name, setName] = useState<Transaction['name']>("")
  const [amount, setAmount] = useState<Transaction['amount']>("")
  const [category, setCategory] = useState<Transaction['category']>("")
  const [date, setDate] = useState<Transaction['date']>(new Date())
  const [recurring, setRecurring] = useState<Transaction['recurring']>(false)

  const userId = localStorage.getItem("userId")

  const dictionary: Record<string, boolean> = {
    "yes": true,
    "no": false
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    const parseDate = new Date(selectedDate)
    setDate(parseDate)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log("userId", userId)
    await axios.post(`http://localhost:4000/transactions/AddTransaction/${userId}`, {
      name,
      amount,
      category,
      date,
      recurring
    })
    .then((response) => {console.log(userId); console.log("response", response, response.data.userId)})
    .catch((err) => console.log(getError(err as ApiError)))
  }

  return (
    
      <form onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Add a Transaction</p>
            <p className="text-xs">Provide Your Transaction details</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstname" className="text-sm mb-2">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Name" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="transaction" className="text-sm mb-2">Amount</label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" type="number" placeholder="Amount" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" required/>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="category" className="text-sm mb-2">Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} id="category" type="text" placeholder="Category" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" required/>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="date" className="text-sm mb-2">Date</label>
              <input value={date.toISOString().substr(0, 10)} onChange={handleDateChange} id="date" type="date" placeholder="Date" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" required/>  
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="state" className="text-sm block mb-2">Is it recurring?</label>
                <div className="flex">
                  <div className="flex items-center mr-4">
                      <input id="default-radio-1" type="radio" onChange={(e) => setRecurring(dictionary[e.target.value])} value="yes" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                  </div>
                  <div className="flex items-center">
                      <input checked id="default-radio-2" type="radio" onChange={(e) => setRecurring(dictionary[e.target.value])} value="no" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                  </div>
                </div>
            </div>
          </div>
          <button type="submit" className="px-4 py-2 border rounded-md dark:border-gray-100">Add Transaction</button>
        </fieldset>
      </form>
  )
}