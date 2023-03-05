import { createSignal } from "solid-js";

function Picker(props) {
  const [checked, setChecked] = createSignal(-1);
  return (
    <ul class="flex flex-wrap gap-2 mt-2 mb-2">
      <For each={props.diets}>
        {(result, i) => (
          <li
            onClick={() => {
              if (checked() == i()) {
                setChecked(-1);
              } else {
                props.dietSet(result);
                setChecked(i);
              }
            }}
            style={{
              "background-color": checked() == i() ? "#86efac" : "#fca5a5",
            }}
            class="p-1 px-2 rounded-full text-center text-white cursor-pointer"
          >
            {result}
          </li>
        )}
      </For>
    </ul>
  );
}

export default Picker;
