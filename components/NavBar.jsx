"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const NavBar = () => {
  
  const [providers , setProviders ] = useState(null);
  useEffect(() => {
    const initProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    initProviders();
  } , []);

  const {data: session} = useSession();

  const isLoggedIn = session?.user != null;
  const imgPath = session?.user.image ?? "/assets/images/logo.svg";

  const [MenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
          
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {
          isLoggedIn ? 
            (
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Prompt
                </Link>

                <button onClick={() => signOut()} type="button" className="outline_btn">
                  Sign Out
                </button>

                <Link href={`/profile/`}>
                  <Image 
                    src={imgPath}
                    width={32}
                    height={32}
                    alt=""
                    className="rounded-full"
                  />
                </Link>
              </div>
            ) :
            ( 
              <>
              {
                providers && Object.values(providers).map(
                  (p) => (
                    <button 
                      key={p.name}
                      type="button"
                      onClick={() => signIn(p.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  )
                )
              }
              </>
            )
        }
      </div>

      <div className="sm:hidden flex relative">
        {
          isLoggedIn ? 
            (
              <div className="flex">
                <Image 
                  src={imgPath}
                  width={32}
                  height={32}
                  alt=""
                  onClick={() => {
                    setMenuOpen((prev) => !prev)
                  }}
                  className="rounded-full"
                />

                {MenuOpen && 
                <div className="dropdown">
                  <Link
                    href="/profile" 
                    className="dropdown_link"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    href="/create-prompt" 
                    className="dropdown_link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create Prompt
                  </Link>

                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>


                </div>
                }
              </div>
            ) :
            ( 
              <>
              {
                providers && Object.values(providers).map(
                  (p) => (
                    <button 
                      key={p.name}
                      type="button"
                      onClick={() => signIn(p.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  )
                )
              }
              </>
            )
        }
      </div>
    </nav>
  );
}

export default NavBar;
