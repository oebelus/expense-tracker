import { Helmet } from "react-helmet-async"
import Signup from "../Components/Signup"

export default function SignupPage() {
  return (
    <div className="bg-gray-900 h-screen">
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div className="relative top-10 x-auto flex w-full h-[90%] max-w-sm mx-auto overflow-hidden dark:bg-gray-800 rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: `url('/background.jpg')`}}></div>
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 overflow-scroll">
              <div className="flex justify-center mx-auto">
                  <img className="w-auto h-7 sm:h-8" src="hero.png" alt=""/>
              </div>
              <Signup/>
          </div>
      </div>
    </div>
  )
}
