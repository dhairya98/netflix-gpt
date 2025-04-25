import React, {useState} from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInform, setIsSignInForm] = useState(true)
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInform);
    }
    const actionText = isSignInform ? ["Sign In", "New to Netflix? Sign Up Now ?"] : ["Sign Up", "Already registered ? Sign In Now"]
    
  return (
    <div>
      <Header />
      <div className="absolute">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_large.jpg"
        srcset="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web_tall_panel/IN-en-20250421-TRIFECTA-perspective_3c263b0f-a9eb-4dc8-99c0-e81c646bbe38_small.jpg 959w"
        alt="Netflix starter"
        aria-hidden="true"
        class="default-ltr-cache-1e28eon"
      />
      </div>
      <form className="absolute p-12 bg-black/90 w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-50">
      <h1 className="font-bold text-3xl py-4">{actionText[0]}</h1>
        {!isSignInform && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />}
        <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700" />
        <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer">{actionText[0]}</button>
        <p className="text-sm py-4" onClick={toggleSignInForm}>{actionText[1]}</p>
      </form>
    </div>
  )
}

export default Login
