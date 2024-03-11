import { useEffect, useReducer } from "react"
import { initialState, reducer } from "../../context"
import axios from "axios"
import { format, getError } from "../../../utils"
import { ApiError } from "../../types/ApiError"

export default function UpcomingPayments() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const user = state.user
  const transactions = state.transactions 

  useEffect(() => {
    axios.get(`http://localhost:4000/transactions/${user._id}`)
    .then((response) => {
      dispatch({type: 'FETCH_TX', payload: response.data})
    })
    .catch((error) => console.log(getError(error as ApiError)))
  }, [transactions, user._id])

  const upcoming = transactions.filter((transaction) => {
    return transaction.recurring === true
  })

  return (
    <div>
        <h1 className="text-xl font-bold text-center mt-4">Upcoming Payments</h1>
        {
            upcoming.map((transaction, key) => ( new Date(transaction.date).getMonth() === new Date().getMonth() && 
              <div key={key} className="max-w-md p-2 sm:flex sm:space-x-2 dark:bg-gray-800 dark:text-gray-100">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h2 className="font-semibold">{transaction.name}</h2>
                    <div className="flex gap-10">
                      {(() => {
                        const currentDate = new Date(transaction.date);
                        currentDate.setMonth(currentDate.getMonth() + 1);
                        return (
                          <span className="text-sm dark:text-gray-400">{format(new Date(currentDate))}</span>
                        );
                      })()}
                      <span className="text-sm dark:text-gray-400">{transaction.amount}$</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
    </div>
  )
}
