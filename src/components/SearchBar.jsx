import { createSignal } from "solid-js";

const SearchBar = (props) => {
    const {id, input, setInput, arr} = props;

    const [invalid, setInvalid] = createSignal(false)

    const updateInput = (event) => {
        const current = event.target.value;
        let didSet = false 
        arr.filter((elem)=>{
            if (current == elem){
                setInvalid(false);
                didSet = true;
                setInput(current);
            }
        })
        if(!didSet){
            setInvalid(true);
        }
    };

    return (
        <>
            <label for={id} style={invalid() ? "" : "display:none"}>Error: Please enter valid item</label>
            <input id={id} type="text" value={input()} onChange={updateInput} />
        </>
    );
};

export default SearchBar;