import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ActionButton from "../../components/ActionButton";


export default function CollectionContainer() {

    return (
        <div className="flex mt-[79px] mb-[79px]  w-screen content-center justify-center">
            <div className="flex w-7/12 flex-col  ">
                <div className="flex w-full p-[40px] content-center justify-center">
                    <a className="text-2xl"><b>CREAR COLECCIÓN</b></a>
                </div>

                <div className="flex flex-col w-full content-center justify-left">
                    <a className="text-lg"><b>Logo de la colección *</b></a>
                    <a className="text-md pt-[20px]"> Selecciona el logo de la colección que será visible al navegar por el marketplace. </a>
                    <div className="flex pt-[30px]">
                        <input className="flex w-[200px] h-[200px]" placeholder="LOGO DE LA COLECCIÓN"/>
                    </div>
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <a className="text-lg"><b>Imagen principal de la colección</b></a>
                    <a className="text-md pt-[20px]"> Selecciona la imagen de presentación de la colección. Esta imagen se utilizará para presentar su colección en la página de inicio u otras áreas promocionales de Fibbo.</a>
                    <div className="flex pt-[30px]">
                        <input className="flex w-[400px] h-[250px]" placeholder="IMAGEN DE PRESENTACIÓN"/>
                    </div>
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <a className="text-lg"><b>Pancarta de la colección</b></a>
                    <a className="text-md pt-[20px]"> Esta imagen aparecerá en la parte superior de la página de tu colección. Evite incluir demasiado texto en esta imagen de banner, ya que las dimensiones cambian en diferentes dispositivos. </a>
                    <div className="flex pt-[30px]">
                        <input className="flex w-[900px] h-[250px]" placeholder="PANCARTA DE LA COLECCIÓN"/>
                    </div>
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <a className="text-lg"><b>Nombre de la colección *</b></a>
                    <textarea
                        className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                            border border-solid border-black rounded transition ease-in-out m-0
                            focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                        rows="1"
                        type="text"
                    />
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <a className="text-lg"><b>URL</b></a>
                    <a className="text-md pt-[20px]"> Personaliza tu URL en OpenSea. Solo puede contener letras minúsculas, números y guiones. </a>
                    <textarea
                        className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                            border border-solid border-black rounded transition ease-in-out m-0
                            focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                        rows="1"
                        type="text"
                        value="https://fibbo-market.web.app/collection/"
                    />
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <a className="text-lg"><b>Descripción</b></a>
                    <a className="text-md pt-[20px]"> La descripción de la colección debe contener un máximo de 1000 carácteres. </a>

                    <textarea
                        className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                            border border-solid border-black rounded transition ease-in-out m-0
                            focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                        rows="5"
                        type="text"
                    />
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <a className="text-lg"><b>Links</b></a>
                    <div className="flex flex-row w-full justify-center items-center ">
                        <Icon className="flex mt-[20px] mr-[20px] ml-[20px]" icon="dashicons:admin-site-alt3" />
                        <textarea
                            className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                                border border-solid border-black rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                            rows="1"
                            type="text"
                            placeholder="tuPaginaWeb.com"
                        />
                    </div>
                    <div className="flex flex-row w-full justify-center items-center ">
                        <Icon className="flex mt-[20px] mr-[20px] ml-[20px]" icon="bi:discord" />
                        <textarea
                            className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                                border border-solid border-black rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                            rows="1"
                            type="text"
                            value="https://discord.gg/"
                        />
                    </div>
                    <div className="flex flex-row w-full justify-center items-center ">
                        <Icon className="flex mt-[20px] mr-[20px] ml-[20px]" icon="bxl:telegram" />
                        <textarea
                            className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                                border border-solid border-black rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                            rows="1"
                            type="text"
                            value="https://t.me/"
                        />
                    </div>
                    <div className="flex flex-row w-full justify-center items-center ">
                        <Icon className="flex mt-[20px] mr-[20px] ml-[20px]" icon="cib:instagram" />
                        <textarea
                            className={`mt-[20px] block dark:bg-dark-1 w-full px-3 py-1.5 text-md font-normal text-gray-700 bg-white bg-clip-padding 
                                border border-solid border-black rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white  dark:border-primary-2  dark:text-gray-200 focus:border-blue-600 focus:outline-none `}
                            rows="1"
                            type="text"
                            value="https://www.instagram.com/"
                        />
                    </div>
                    
                    
                </div>

                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <div className="flex flex-row gap-2">
                        <label className="">
                        <input type="checkbox" className="" value="" />

                        <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3 flex-row ">
                            Contenido Explícito o Sensible
                        </span>
                        </label>
                        <abbr
                        className="cursor-pointer "
                        title="Si el contenido és explícito o sensible, como pornografía o contenido 'not safe for work' (NSFW), protegerá a los usuarios de FIBBO que realicen búsquedas seguras y no les mostrará el contenido."
                        >
                        <Icon
                            className="w-auto h-auto flex m-0"
                            icon="akar-icons:info"
                        />
                        </abbr>
                    </div>
                </div>


                <div className="flex flex-col w-full pt-[40px] content-center justify-left">
                    <ActionButton text="Crear Colección" size="large"/>
                </div>




            </div>
           
        </div>
       
      
    )

}