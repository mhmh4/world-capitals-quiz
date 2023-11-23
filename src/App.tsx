import { sample } from "lodash";
import { useEffect, useState } from "react";

import data from "./data";

function App() {
  const [src, setSrc] = useState("");
  const [country, setCountry] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  const [selection, setSelection] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const shuffledData = data.sort(() => 0.5 - Math.random());
    const prefix = shuffledData.slice(0, 4);

    setOptions(
      prefix.map((item) => {
        return item.capital;
      }),
    );

    const target = sample(prefix)!;
    const { imageFileName } = target;

    setAnswer(target.capital);

    setCountry(target.country);
    setSrc("./src/images/" + imageFileName);
  }, []);

  function handleSubmit() {
    selection === answer ? alert("correct") : alert("not correct");
  }

  return (
    <>
      <div className="mx-auto min-h-screen w-2/3 pt-[15vh]">
        <div className="flex">
          <div className="w-1/2 border">
            <img src={src} alt="img"></img>
          </div>
          <div className="w-1/2">
            <h1>What is the capital of {country}?</h1>
            {options.map((option, index) => {
              return (
                <div
                  className={`my-2 cursor-pointer rounded border-2 border-slate-300 p-2 ${
                    option == selection && "border-blue-400 bg-slate-100"
                  }`}
                  key={index}
                  onClick={() => {
                    setSelection(option);
                  }}
                >
                  {option}
                </div>
              );
            })}
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
