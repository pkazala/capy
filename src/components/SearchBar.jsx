import { createSignal, createEffect } from "solid-js";

const SearchBar = (props) => {
  const { id, input, setInput, arr } = props;

  const [invalid, setInvalid] = createSignal(false);

  const updateInput = (event) => {
    const current = event.target.value;
    if(current == ""){
        return;
    }
    let didSet = false;
    arr().filter((elem) => {
      if (current == elem) {
        setInvalid(false);
        didSet = true;
        setInput(current);
      }
    });
    if (!didSet) {
      setInvalid(true);
    }
  };

  return (
    <div class="mt-2 mb-2">
      <label for={id} style={invalid() ? "" : "display:none"} class="text-red-400 text-sm mb-2">
        Error: Please enter valid item
      </label>
      <input
        id={id}
        type="text"
        value={input()}
        onChange={updateInput}
        class="bg-slate-100 rounded-xl p-1 shadow-lg"
      />
      <Show when={typeof(arr()[0]) != "number"}>
        <button onClick={updateInput}>Add</button>
      </Show>
    </div>
  );
};

export default SearchBar;
