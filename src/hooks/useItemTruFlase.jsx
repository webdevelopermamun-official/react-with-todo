import { useState } from "react"


const useItemTruFlase = (defultValue = false) => {
    const [itemTruFlase, setItemTruFlase] = useState(defultValue);

    return {itemTruFlase, setItemTruFlase}
}

export default useItemTruFlase