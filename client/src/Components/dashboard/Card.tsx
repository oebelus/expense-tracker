import { useReducer } from "react"
import { initialState, reducer } from "../../context"

type CardProps = {
    percent: string,
    name: string,
    money: number,
    color: string,
    text: string,
    shadow: string,
    border: string,
}

export default function Card({percent, name, money, color, text, shadow}: CardProps) {
  const [state, ] = useReducer(reducer, initialState)

    return (
      <div className="relative group flex-mx-2 w-full h-full">
        <div className={`absolute inset-0.5 opacity-50 group-hover:opacity-100 transition duration-200 rounded-lg rounded-md ${shadow} blur`}></div>
        <div className={`relative px-4 py-3 bg-dark rounded-md rounded-lg shadow-md ${color}`}>
          <p className={`bg-white w-content h-full rounded-lg ${text} font-bold inline-block px-2`}>{isNaN(parseFloat(percent)) ? 0+"%" : percent}</p>
          <h5 className="mt-4 text-center text-white text-gray-900">{name}</h5>
          <h3 className="text-center text-white text-gray-900">{money} {state.currency}</h3>
        </div>
    </div>
            
    )
}
