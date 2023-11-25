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
      <div className="mx-auto min-h-screen w-[75vw] pt-[10vh]">
        <div className="text-slate-500">Score: {score}</div>
        <h1 className="text-xl">What is the capital of {country}?</h1>
        <div className="flex">
          <div className="w-2/3">
            <img className="rounded-xl" src={src} alt="img"></img>
          </div>
          <div className="w-1/3 px-4">
            {options.map((option, index) => {
              return (
                <div
                  className={clsx(
                    "my-2 cursor-pointer rounded border-2 border-slate-300 p-2",
                    {
                      "bg-green-200": hasSubmitted && option === answer,
                      "bg-red-200":
                        hasSubmitted &&
                        option === selection &&
                        selection !== answer,
                      "border-blue-300 bg-blue-50":
                        !hasSubmitted && option === selection,
                      "hover:bg-slate-100": !hasSubmitted,
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
            {hasSubmitted ? (
              <button
                className="mt-3 w-1/2 rounded border bg-slate-200 py-1 hover:bg-slate-300"
                type="button"
                onClick={reset}
              >
                Next
              </button>
            ) : (
              <button
                disabled={selection === ""}
                className="mt-3 w-1/2 rounded border bg-slate-200 py-1 hover:bg-slate-300"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
