import React from "react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#000]">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-white sm:text-center">© 2024{" "}
                    <a href="https://github.com/juanjosbg/prueba-inlaze" target="_blank" className="hover:underline"> Prueba Inlaze</a>  -   All Rights Reserved by Juanjo.
                </span>

                <div className="flex flex-4 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                        <Image
                            alt="Logo Company Movie"
                            src="/images/LogoMovie.png"
                            width={100}
                            height={100}
                            className="w-auto h-8 "
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}