import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full h-screen bg-main text-white ">
      <div className="max-w-screen-2xl mx-auto px-4 h-full">
        <div className="grid grid-cols-2 gap-x-4 h-full">
          {/* col-1 */}
          <div className="w-full py-5 flex flex-col justify-center h-full relative">
            {/* logo */}
            <span className="font-semibold uppercase absolute top-5">FilmToken</span>
            <div className=" flex flex-col gap-y-8">
              <h1 className="text-4xl font-bold ">Welcome Back</h1>
              <h4 className="font-semibold flex items-center gap-x-4">New user ? <Link className="text-secondary" href={"/"}>Register New Account</Link></h4>
              <div className="flex flex-col gap-y-5">
                {/* tab here */}
                <form className="flex flex-col gap-y-4">
                  <label>salam</label>
                  <label>salam</label>

                </form>
              </div>
            </div>
          </div>

          {/* col-2 */}
        </div>
      </div>
    </div>
  );
}
