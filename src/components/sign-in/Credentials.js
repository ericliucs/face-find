function Credentials({ onSignIn, onRegister, route }) {
  // Modified code from https://tailwindui.com/components/application-ui/forms/sign-in-forms
  return (
    <div className="mt-24 px-4 lg:px-8 flex min-h-full flex-1 flex-col justify-center ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          {route === "sign-in" ? "Sign in to your account" : "Register your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          {route === "register" &&
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500
                  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          }

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              {/*<div className="text-sm">*/}
              {/*  <a href="#" className="font-semibold hover:text-slate-400">*/}
              {/*    Forgot password?*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm
                sm:leading-6"
              />
            </div>
          </div>

          {route === "sign-in" &&
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6
            text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                onClick={onSignIn}
              >
                Sign in
              </button>
            </div>
          }

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6
            text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              onClick={onRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credentials;
