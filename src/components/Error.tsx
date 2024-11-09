import { CatIcon, CloudSunIcon } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

export default function Error() {

  const error: any = useRouteError()
  return (
    <>

        // error.status === 404 &&
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="mb-8">
          {/* <CloudSunIcon className="text-[#F9A826] text-6xl" /> */}
        </div>
        {
          error.status === 404 &&
          <>
            <h1 className="mb-2 text-6xl font-bold text-gray-800">404</h1>
            <p className="mb-4 text-2xl font-light text-gray-600">Page not found</p>
            {/* <p className="mb-8 text-lg text-gray-500">Sorry, this page have some issue.</p> */}
          </>
        }
        <div>
          <h1 className="mb-2 text-6xl font-bold text-gray-800">{error.status}</h1>
          <p className="mb-4 text-2xl font-light text-gray-600">{error.statusText || error.message}</p>
          <p className="mb-8 text-lg text-gray-500">Sorry, this page have some issue.</p>
        </div>

        <Link to={'/'} className="mb-4 inline-block text-sm">
          <Button variant="default">Go back home</Button>
        </Link>
        <div className="mt-16">
          <CatIcon className="text-gray-300 text-9xl" />
        </div>
      </div>


    </>
  )
}