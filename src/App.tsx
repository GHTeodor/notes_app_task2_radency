import React from 'react';

import {NotesTable} from "./components";
import {thead, theadSummary} from "./constants";
import {useAppSelector} from "./hooks";

function App() {
    const {archived} = useAppSelector(state => state.noteSlice);

    return (
        <>
            <NotesTable thead={thead}/>
            {archived.length && <NotesTable thead={theadSummary}/>}
        </>
    );
}

export default App;