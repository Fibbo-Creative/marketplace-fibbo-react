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
            
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a1_1}</p>
                <p className="p-2 text-justify">{literals.faq.a1_2}</p>
              </div>

          </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q2}>

              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a2_1}</p>
                <p className="p-2 text-justify">{literals.faq.a2_2}</p> <a>{literals.faq.a2_3}</a>
              </div>

            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q3}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a3_1}</p>
                <p className="p-2 text-justify">{literals.faq.a3_2}</p>
                <p className="p-2 text-justify">{literals.faq.a3_3}</p>
                <p className="p-2 text-justify">{literals.faq.a3_4}</p>
                <p className="p-2 text-justify">{literals.faq.a3_5}</p>
                <p className="p-2 text-justify">{literals.faq.a3_6}</p>
                <p className="p-2 text-justify">{literals.faq.a3_7}</p>
                <p className="p-2 text-justify">{literals.faq.a3_8}</p>
                <p className="p-2 text-justify">{literals.faq.a3_9}</p>
                <p className="p-2 text-justify">{literals.faq.a3_10}</p>
                <p className="p-2 text-justify">{literals.faq.a3_11}</p>
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q4}>

              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a4_1}</p>
                <p className="p-2 text-justify">{literals.faq.a4_2}</p> 
                <p className="p-2 text-justify">{literals.faq.a4_3}</p> 
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q5}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a5_1}</p>
                <p className="p-2 text-justify">{literals.faq.a5_2}</p> 
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q6}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a6_1}</p>
                <p className="p-2 text-justify">{literals.faq.a6_2}</p> 
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q7}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a7_1}</p>
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q8}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a8}</p>
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q9}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a9_1}</p>
                <p className="p-2 text-justify">{literals.faq.a9_2}</p>

              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q10}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a10}</p>
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q11}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a11_1}</p>
                <p className="p-2 text-justify">{literals.faq.a11_2}</p>
                <p className="p-2 text-justify">{literals.faq.a11_3}</p>

              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q12}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-text-justify">{literals.faq.a12}</p>
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q13}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a13}</p>
              </div>
            </DropDown>
         </div>

         <div className="flex mt-4 w-full items-center justify-center">
          <DropDown
            opened={false}
            className={`mb-5 dark:bg-dark-2 text-white w-4/5 xs:w-[500px] md:w-[650px] lg:w-[900px] text-bold`}
            icon="material-symbols:arrow-drop-down"
            title={literals.faq.q14}>
              <div className="flex flex-col Class Properties text-left">
                <p className="p-2 text-justify">{literals.faq.a14}</p>
              </div>
            </DropDown>
         </div>
       
        </div>

        

      </PageWithLoading>

   
    );
  }
  


