import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom"
import { useState } from "react";

export default function Navbar() {
    const [url, setUrl] = useState('hero');

    return (
        <header className="p-4 dark:bg-gray-800 dark:text-gray-100 sticky top-0 z-50">
	<div className="container flex justify-between h-16 mx-auto">
		<a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2">
            <img 
                src="/hero.png" 
                alt=""
                className="w-11 h-11 p-2 rounded-full" 
            />
		</a>
		<ul className="items-stretch hidden space-x-3 lg:flex">
			<li className="flex">
				<Link 
                    rel="noopener noreferrer" 
                    to="hero" 
                    smooth 
                    duration={500} 
                    className={`${url === 'hero' ? "dark:text-violet-400 dark:border-violet-400" : ""} flex items-center px-4 -mb-1 border-b-2 dark:border-transparent`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setUrl('hero')}
                    >
                        Home
                </Link>
			</li>
			<li className="flex">
				<Link 
                    rel="noopener noreferrer" 
                    to="features" 
                    smooth 
                    duration={500} 
                    className={`${url === 'features' ? "dark:text-violet-400 dark:border-violet-400" : ""} flex items-center px-4 -mb-1 border-b-2 dark:border-transparent`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setUrl('features')}
                    >
                        Features
                </Link>
			</li>
			<li className="flex">
				<Link 
                    rel="noopener noreferrer" 
                    to="steps" 
                    smooth
                    duration={500}
                    className={`${url === 'steps' ? "dark:text-violet-400 dark:border-violet-400" : ""} flex items-center px-4 -mb-1 border-b-2 dark:border-transparent`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setUrl('steps')}
                >
                    Steps
                </Link>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
			</li>
		</ul>
		<div className="items-center flex-shrink-0 hidden lg:flex">
			<RouterLink to="/Login"><button className="self-center px-8 py-3 rounded">Login</button></RouterLink>
			<RouterLink to="/Signup"><button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign Up</button></RouterLink>
		</div>
		<button className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100" style={{ '--darkreader-inline-stroke': 'currentColor' } as React.CSSProperties} data-darkreader-inline-stroke="">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
    )
  }