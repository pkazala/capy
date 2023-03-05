function Picker(props) {
  console.log(props);
  return (
    <ul class="flex flex-wrap gap-2 mt-2 mb-2">
      <For each={props.diets}>
        {(result) => (
          <li class="p-1 px-2 bg-red-300 rounded-full text-center text-white cursor-pointer">
            {result}
          </li>
        )}
      </For>
    </ul>
  );
}

export default Picker;
