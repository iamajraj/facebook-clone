import Image from "next/image"
import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <div className="grid place-items-center">
        <Image
        src={"https://links.papareact.com/t4i"}
        height={400}
        width={400}
        objectFit="contain"
        />
        <h1 onClick={signIn} className="p-5 bg-blue-500 text-white rounded-full cursor-pointer text-center hover:bg-blue-600 transition-all duration-200 active:scale-105">Login with Facebook</h1>
    </div>
  )
}

export default Login