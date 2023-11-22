import { useState } from "react";

function App() {
  const [src, setSrc] = useState("");

  return (
    <>
      <div className="mx-auto min-h-screen w-2/3 pt-[15vh]">
        <div className="flex">
          <div className="w-1/2 border">
            <img src={src} alt="img"></img>
          </div>
          <div className="w-1/2">
            <input type="radio" name="selection" />
            <label>Option 1</label>
            <input type="radio" name="selection" />
            <label>Option 2</label>
            <input type="radio" name="selection" />
            <label>Option 3</label>
            <input type="radio" name="selection" />
            <label>Option 4</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </div>
    </>
  );
}

export default App;
