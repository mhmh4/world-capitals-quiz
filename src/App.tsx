import clsx from "clsx";
import { sample, shuffle } from "lodash";
import { useEffect, useState } from "react";

import data from "./data";
import { CapitalInfo } from "./definitions";

function App() {
  const [bank, setBank] = useState<CapitalInfo[]>(data);

  const [src, setSrc] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const [selection, setSelection] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    reset();
  }, []);

  function reset() {
    setSelection("");
    setHasSubmitted(false);

    const shuffledData = shuffle(bank);
    const prefix = shuffledData.slice(0, 4);

    setOptions(() => {
      return prefix.map((item) => {
        return item.capital;
      });
    });

    const target = sample(prefix)!;
    const { imageFileName } = target;

    setAnswer(target.capital);

    setCountry(target.country);
    setSrc("./src/images/" + imageFileName);
  }

  function handleSubmit() {
    setHasSubmitted(true);
    if (selection === answer) {
      setScore((currentScore) => currentScore + 1);
    }
    setBank((currentBank) => {
      return currentBank.filter((item) => {
        return item.capital !== answer;
      });
    });
  }

  return (
    <>
      <div className="select-none">
        <div className="mx-auto min-h-full w-3/4">
          <div className="my-6 text-center">
            <div className="text-slate-500">Score: {score}</div>
            <h1 className="text-xl">What is the capital of {country}?</h1>
          </div>
          <div className="flex">
            <div className="w-2/3">
              <img
                className="rounded-xl shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,_rgba(0,0,0,0.05)_0px_1px_1px_0px]"
                src={src}
                alt="img"
              ></img>
            </div>
            <div className="flex w-1/3 flex-col px-4">
              <div className="flex grow flex-col">
                {options.map((option, index) => {
                  return (
                    <div
                      className={clsx(
                        "mb-2 grow cursor-pointer rounded-lg border-2",
                        {
                          "bg-green-200": hasSubmitted && option === answer,
                          "bg-red-200":
                            hasSubmitted &&
                            option === selection &&
                            selection !== answer,
                          "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100":
                            !hasSubmitted && option !== selection,
                          "border-blue-400 bg-blue-100":
                            !hasSubmitted && option === selection,
                        },
                      )}
                      key={index}
                      onClick={() => {
                        setSelection(option);
                      }}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
              {hasSubmitted ? (
                <button
                  className="mx-auto mt-3 w-2/3 cursor-pointer rounded-md bg-[#3E5C76] py-1.5 text-white"
                  type="button"
                  onClick={reset}
                >
                  Continue
                </button>
              ) : (
                <button
                  disabled={selection === ""}
                  className="mx-auto mt-3 w-2/3 cursor-pointer rounded-md bg-[#3E5C76] py-1.5 text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
