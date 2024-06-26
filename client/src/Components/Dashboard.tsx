import { useEffect, useReducer, useState } from "react";
import Card from "./dashboard/Card";
import Plot from "./dashboard/chart/Plot";
import axios from "axios";
import TxHistory from "./dashboard/TxHistory";                                                                                                                             
import UpcomingPayments from "./dashboard/UpcomingPayments";
import { initialState, reducer } from "../context";
import { MonthlyData } from "../types/MonthlyData";
import { PieChart } from "./dashboard/PieChart";
import SavingPlans from "./dashboard/SavingPlans";
import { Transaction } from "../types/Transaction";
import Years from "./dashboard/Years";
import Months from "./dashboard/Months";

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [monthlyTotals, setMonthlyTotals] = useState<MonthlyData>({
    income: new Array(12).fill(0),
    expense: new Array(12).fill(0),
    budget: new Array(12).fill(0),
  })
  
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [years, setYears] = useState<number[]>([])
  const last = new Date().getFullYear()

  const [clickedYear, setClickedYear] = useState<number>(new Date().getFullYear())

  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [monthly, setMonthly] = useState<Transaction[]>([])
  const [yearly, setYearly] = useState<Transaction[]>([])

  const user = state.user
  const transactions = state.transactions

  useEffect(() => {
    axios.get(`http://localhost:4000/transactions/${user._id}`)
      .then((response) => {
          dispatch({type: 'FETCH_TX', payload: response.data})
          setYear(new Date().getFullYear())
          setYears(Array.from({length: last - year + 1}, (_, index) => year + index))
      })
      .catch((err) => {console.log(err)})
    }, [user._id, clickedYear, last, year]);

  useEffect(() => {
    const monthlyTotalsCopy = {
      income: new Array(12).fill(0),
      expense: new Array(12).fill(0),
      budget: new Array(12).fill(0),
    };

    const filterByYear = transactions.filter((transaction) => {
      const transactionYear = new Date(transaction.date).getFullYear() as number
      return transactionYear === clickedYear
    })
    setYearly(filterByYear)
    filterByYear.forEach((transaction) => {
      const monthIndex = new Date(transaction.date).getMonth()
      const transactionAmount = transaction.amount

      if (transactionAmount > 0) 
        monthlyTotalsCopy.income[monthIndex] += transactionAmount
      else if (transactionAmount < 0)
        monthlyTotalsCopy.expense[monthIndex] += Math.abs(transactionAmount)
      monthlyTotalsCopy.budget[monthIndex] = monthlyTotalsCopy.income[monthIndex] - monthlyTotalsCopy.expense[monthIndex]
    })
    setMonthlyTotals(monthlyTotalsCopy)
  }, [clickedYear, transactions])

  useEffect(() => {
    const filterByMonth = yearly.filter((transaction) => {
      const transactionMonth = new Date(transaction.date).getMonth() as number
      return transactionMonth === month
    })
    setMonthly(filterByMonth)
  }, [month, yearly])

  const budget = monthlyTotals.budget.reduce((a, b) => a + b);
  const expense = monthlyTotals.expense.reduce((a, b) => a + b);
  const income = monthlyTotals.income.reduce((a, b) => a + b);

  const total = budget + expense + income

  const pBudget = ((budget/total)*100).toFixed(2)
  const pExpense = ((expense/total)*100).toFixed(2)
  const pIncome = ((income/total)*100).toFixed(2)

  const cardsData = [
    { percent: `${pBudget}%`, name: "Balance", money: budget, color: "bg-gray-700", border: "border-violet-200", shadow: "bg-violet-600", text: "text-violet-900" },
    { percent: `${pExpense}%`, name: "Total Expense", money: expense, color: "bg-gray-700", border: "border-pink-200", shadow: "bg-pink-600", text: "text-pink-900" },
    { percent: `${pIncome}%`, name: "Total Income", money: income, color: "bg-gray-700", border: "border-green-200", shadow: "bg-green-600", text: "text-green-900" }
  ];
  
  return (
    <section className="p-6 dark:bg-gray-900 dark:text-gray-50 overflow-y-hidden">
      <h1 className="lg:text-2xl font-bold">Welcome to your Dashboard, {user.firstName}</h1>
      <p className="mt-4">This Year: ({year})</p>
      <div className="flex flex-col shadow-md w-90 m-6 sm:flex-row gap-4">
        {cardsData.map((card, key) => {
          return (
            <Card 
              key={key} 
              percent={card.percent} 
              name={card.name} 
              money={card.money} 
              color={card.color}
              text={card.text}
              shadow={card.shadow}
              border={card.border}
            />
          )
        })}
      </div>
      <div id="dashboard" className="grid gap-4 lg:grid-cols-4 sm:col-span-3">
        <div className="w-auto flex flex-col relative items-center bg-gray-800 rounded-lg sm:col-span-1 lg:col-span-2 md:col-span-2">
          <div className='lg:w-[20%] md:w-[10%] w-[10%] absolute top-2 right-2'>
            <Years years={years} setClickedYear={setClickedYear}/>
          </div>
          <Plot monthlyData={monthlyTotals} />
        </div>
        <div className="w-auto flex flex-col relative items-center bg-gray-800 rounded-lg sm:col-span-1 lg:col-span-2 md:col-span-2">    
          <div className='lg:w-[20%] md:w-[10%] w-[10%] absolute top-2 right-2'>
            <Months setMonth={setMonth}/>
          </div>
            <PieChart transactions={monthly} />
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-4 mt-4">
        <div className="flex flex-col sm:flex-row lg:flex-row md:flex-row sm:col-span-1 lg:col-span-2 sm:gap-2 gap-4 justify-between">
          <TxHistory/>
          <UpcomingPayments />
        </div>
        <div className="p-2 col-span-2">
         <SavingPlans/>
        </div>
      </div>
    </section>
  );
}
