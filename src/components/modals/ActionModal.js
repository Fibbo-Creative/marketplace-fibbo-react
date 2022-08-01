import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Check } from "../lottie/Check";
import ActionButton from "../ActionButton";

export const ActionModal = ({
  children,
  title,
  showModal,
  handleCloseModal,
  onSubmit,
  submitDisabled,
  submitLabel,
  size,
  completedText,
  completedLabel,
  completedAction,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSumbit = async () => {
    setLoadingAction(true);
    try {
      await onSubmit();
      setCompleted(true);
      setLoadingAction(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCompleteAction = () => {
    setCompleted(false);
    completedAction();
  };

  return (
    <Dialog
      as="div"
      open={showModal}
      className="fixed inset-0 z-10 overflow-y-auto "
      onClose={() => !loadingAction && handleCloseModal()}
    >
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="dark:bg-dark-3 dark:text-white inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:shadow-dark-1 shadow-gray-400  rounded-2xl">
          <Dialog.Panel>
            <Dialog.Title
              as="h3"
              className="dark:text-white text-lg font-medium leading-6 text-gray-900 flex justify-between"
            >
              <div className="font-bold">{title}</div>
              <div
                className="cursor-pointer"
                onClick={() => handleCloseModal()}
              >
                <Icon className="text-2xl" icon="ant-design:close-outlined" />
              </div>
            </Dialog.Title>
            {!completed ? (
              <>
                {children}
                <div className="w-full flex items-center justify-center">
                  <ActionButton
                    disabled={submitDisabled}
                    variant="contained"
                    size="large"
                    text={submitLabel}
                    buttonAction={handleSumbit}
                  />
                </div>
              </>
            ) : (
              <div className="my-10 mx-8 flex flex-col gap-10 items-center">
                <div className="flex gap-5 items-center">
                  <Check />
                  <p>{completedText}</p>
                </div>
                <div className="w-full flex items-center justify-center">
                  <ActionButton
                    variant="contained"
                    size="large"
                    text={completedLabel}
                    buttonAction={() => handleCompleteAction()}
                  />
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
