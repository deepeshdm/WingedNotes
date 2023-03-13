import React from 'react'

type DialogBoxType = {
  setConfirmationText: React.Dispatch<React.SetStateAction<string>>,
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>,
  confirmationText: string,
  deleteAccount: () => Promise<void>
}

export default function DeleteAccountDialogBox({ setConfirmationText, setButtonActive, confirmationText, deleteAccount }: DialogBoxType) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-1/4 p-5 rounded-md shadow-lg">
          <p className="text-lg font-semibold mb-4"> Permanently Delete your Account, You'll loose all Notes ?! 🤯 </p>

          <div className="mb-4">
            <label className="block text-sm text-slate-500 font-bold mb-2"> Write "DELETEMYACCOUNT" to Confirm Deletion </label>
            <div className="flex items-center bg-neutral-300 hover:bg-neutral-200 rounded-md">
              <input placeholder="DELETEMYACCOUNT" onChange={(e) => setConfirmationText(String(e.target.value))} maxLength={15}
                className="bg-transparent w-full pl-3 py-5 text-black focus:outline-none" />
            </div>
          </div>

          <div className="mt-10">
            <button disabled={confirmationText !== "DELETEMYACCOUNT"}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-3 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={deleteAccount}> DELETE NOW
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md float-right"
              onClick={() => setButtonActive(false)}> CANCEL </button>
          </div>
        </div>
      </div>
    </>
  )
}
