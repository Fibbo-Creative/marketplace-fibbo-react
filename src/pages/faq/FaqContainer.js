import { PageWithLoading } from "../../components/basic/PageWithLoading";
import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import DropDown from "../../components/DropDown";
import { engLiterals } from "../../context/lang";
import { useStateContext } from "../../context/StateProvider";

export default function FaqContainer() {
    const [{ literals }] = useStateContext();
  
    return (
        <PageWithLoading loading={false}>
 
        <div className="absolute w-screen h-auto m-0 p-0 b-0 bg-gradient-to-r from-neutral-900 to-violet-900 dark:bg-dark-1">
         <div className="flex mt-20 w-full items-center justify-center ">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q1}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q2}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q3}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q4}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q5}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q6}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q7}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q8}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q9}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q10}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q11}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q12}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q13}>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q14}>
            </DropDown>
         </div>
       
        </div>

        

      </PageWithLoading>

   
    );
  }
  


